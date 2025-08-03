import { NextRequest, NextResponse } from 'next/server';

const FIFTEEN_MINUTES = 15 * 60 * 1000;
const FIVE_MINUTES = 5 * 60 * 1000;
const AMOUNT_OF_REQUESTS_PER_USER = 10;
const AMOUNT_OF_VOTES_PER_USER = 100;

// Simple HTML sanitization without JSDOM
const sanitizeHtmlSimple = (html: string): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // Remove potentially dangerous HTML tags and attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<a[^>]*href\s*=\s*["']?javascript:/gi, '<a href="#"')
    .replace(/<a[^>]*href\s*=\s*["']?data:/gi, '<a href="#"');
};

/**
 * We sanitize html by stripping it of text content
 * @param {string} html
 * @returns void
 */
export const stripHtml = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * @param html - The HTML string to sanitize
 * @returns {string} - Sanitized HTML string, empty if sanitization fails
 */
export const sanitizeHtml = (html: string): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  try {
    return sanitizeHtmlSimple(html);
  } catch (error) {
    console.error('Error sanitizing HTML:', error);
    return '';
  }
};

/**
 * Validate if the HTML content is safe
 *
 * Checks if the HTML content is safe by sanitizing it and comparing it to the original string.
 * @param {string} html - The HTML string to validate
 * @returns {boolean} - true if the content is safe, false otherwise
 */
export const isHtmlSafe = (html: string): boolean => {
  if (!html || typeof html !== 'string') {
    return false;
  }

  try {
    const sanitized = sanitizeHtmlSimple(html);
    return sanitized === html;
  } catch (error) {
    console.error('Error validating HTML:', error);
    return false;
  }
};

// Simple in-memory rate limiting for Next.js API routes
interface IRateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const rateLimitStore: IRateLimitStore = {};

// Clean up old entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach((key) => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key];
    }
  });
}, FIFTEEN_MINUTES);

interface IRateLimitOptions {
  windowMs?: number;
  max?: number;
  message?: string;
  useUserId?: boolean;
}

/**
 * Rate limiting middleware för Next.js API routes
 *
 * This is a simple rate limiting middleware that uses an in-memory store to keep track of the number of requests per user/IP.
 * It is used to prevent abuse of the API, such as spamming or DDOS attacks.
 * @param {NextRequest} req - The request object
 * @param {IRateLimitOptions} options - Rate limiting options
 * @returns {NextResponse | null} - NextResponse eller null om request ska tillåtas
 */
export const rateLimit = async (
  req: NextRequest,
  options: IRateLimitOptions = {}
): Promise<NextResponse | null> => {
  const {
    windowMs = FIFTEEN_MINUTES,
    max = AMOUNT_OF_REQUESTS_PER_USER,
    message = 'För många requests. Försök igen senare.',
    useUserId = false,
  } = options;

  let identifier: string;

  if (useUserId) {
    // Försök hämta user ID från request body
    // Vi behöver klona request för att läsa body
    const clonedReq = req.clone();
    let userId: string | null = null;

    try {
      const body = await clonedReq.json();
      userId = body.userId;
    } catch {
      // If we cannot read the body, use IP as fallback
      console.warn(
        'Could not read request body for rate limiting, falling back to IP'
      );
    }

    if (!userId) {
      // Fallback to IP-based rate limiting
      const forwarded = req.headers.get('x-forwarded-for');
      const realIp = req.headers.get('x-real-ip');
      const ip = forwarded?.split(',')[0] || realIp || 'unknown';
      identifier = `ip:${ip}`;
    } else {
      identifier = `user:${userId}`;
    }
  } else {
    // Use IP address as fallback
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0] || realIp || 'unknown';
    identifier = `ip:${ip}`;
  }

  const now = Date.now();
  const key = `${identifier}:${req.nextUrl.pathname}`;

  // Get or create rate limit entry
  if (!rateLimitStore[key] || rateLimitStore[key].resetTime < now) {
    rateLimitStore[key] = {
      count: 1,
      resetTime: now + windowMs,
    };
  } else {
    rateLimitStore[key].count++;
  }

  // Check if rate limit is exceeded
  if (rateLimitStore[key].count > max) {
    return NextResponse.json(
      { error: message },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': max.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitStore[key].resetTime.toString(),
          'Retry-After': Math.ceil(windowMs / 1000).toString(),
        },
      }
    );
  }

  // Add rate limit headers
  const remaining = Math.max(0, max - rateLimitStore[key].count);
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', max.toString());
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set(
    'X-RateLimit-Reset',
    rateLimitStore[key].resetTime.toString()
  );

  return null; // Allow request
};

/**
 * Forum-specific rate limiting (per user)
 * @param {NextRequest} req - The request object
 * @returns {NextResponse | null} - NextResponse or null if request is allowed
 */
export const forumRateLimit = async (
  req: NextRequest
): Promise<NextResponse | null> => {
  return await rateLimit(req, {
    windowMs: FIFTEEN_MINUTES,
    max: AMOUNT_OF_REQUESTS_PER_USER,
    message: 'Du skapar för många inlägg. Vänta lite innan du skapar fler.',
    useUserId: true,
  });
};

/**
 * Comment-specific rate limiting (per user, stricter)
 *
 * @param {NextRequest} req - The request object
 * @returns {NextResponse | null} - NextResponse or null if request is allowed
 */
export const commentRateLimit = async (req: NextRequest) => {
  return await rateLimit(req, {
    windowMs: FIVE_MINUTES,
    max: AMOUNT_OF_REQUESTS_PER_USER,
    message: 'Du kommenterar för ofta. Vänta lite innan du kommenterar igen.',
    useUserId: true,
  });
};

/**
 * Vote-specific rate limiting (per user, very permissive)
 * Allows many votes but prevents spam
 *
 * @param {NextRequest} req - The request object
 * @returns {NextResponse | null} - NextResponse or null if request is allowed
 */
export const voteRateLimit = async (req: NextRequest) => {
  return await rateLimit(req, {
    windowMs: FIVE_MINUTES,
    max: AMOUNT_OF_VOTES_PER_USER, // Allow many votes per 5 minutes
    message: 'Du röstar för ofta. Vänta lite innan du röstar igen.',
    useUserId: true,
  });
};
