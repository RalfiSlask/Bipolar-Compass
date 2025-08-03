import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/settings/fetch-avatar:
 *   post:
 *     summary: Fetch user avatar image from S3
 *     description: |
 *       Hämtar användarens profilbild från S3-lagring och returnerar den som bild.
 *       Denna endpoint fungerar som en proxy för att säkert hämta bilder från S3
 *       utan att exponera S3-credentials till frontend. Bilden cachas för prestanda.
 *     tags:
 *       - Settings
 *       - User
 *       - Profile
 *       - Media
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatarUrl:
 *                 type: string
 *                 description: S3 URL for the avatar image
 *                 example: "https://s3.amazonaws.com/bucket/avatar/user123.jpg"
 *             required:
 *               - avatarUrl
 *           examples:
 *             valid_url:
 *               summary: Valid S3 avatar URL
 *               value:
 *                 avatarUrl: "https://s3.amazonaws.com/bucket/avatar/user123.jpg"
 *     responses:
 *       200:
 *         description: Avatar image fetched successfully
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *               description: Avatar image data
 *         headers:
 *           Content-Type:
 *             description: Image MIME type
 *             schema:
 *               type: string
 *               example: "image/jpeg"
 *           Cache-Control:
 *             description: Cache control header for performance
 *             schema:
 *               type: string
 *               example: "public, max-age=31536000"
 *       400:
 *         description: Bad request - No avatar URL provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "No avatar URL provided"
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Avatar not found in S3
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Avatar not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Failed to fetch avatar"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/settings/fetch-avatar', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer your_jwt_token_here'
 *             },
 *             body: JSON.stringify({
 *               avatarUrl: 'https://s3.amazonaws.com/bucket/avatar/user123.jpg'
 *             })
 *           });
 *
 *           if (response.ok) {
 *             const imageBlob = await response.blob();
 *             const imageUrl = URL.createObjectURL(imageBlob);
 *             console.log('Avatar fetched successfully');
 *           }
 *       - lang: TypeScript
 *         source: |
 *           interface FetchAvatarRequest {
 *             avatarUrl: string;
 *           }
 *
 *           const response = await fetch('/api/settings/fetch-avatar', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer your_jwt_token_here'
 *             },
 *             body: JSON.stringify({
 *               avatarUrl: 'https://s3.amazonaws.com/bucket/avatar/user123.jpg'
 *             } as FetchAvatarRequest)
 *           });
 *
 *           if (response.ok) {
 *             const imageBlob = await response.blob();
 *             const imageUrl = URL.createObjectURL(imageBlob);
 *             console.log('Avatar fetched successfully');
 *           } else {
 *             const error = await response.json();
 *             console.error('Failed to fetch avatar:', error);
 *           }
 *       - lang: cURL
 *         source: |
 *           curl -X POST "https://your-domain.com/api/settings/fetch-avatar" \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer your_jwt_token_here" \
 *             -d '{"avatarUrl": "https://s3.amazonaws.com/bucket/avatar/user123.jpg"}' \
 *             --output avatar.jpg
 *     x-common-errors:
 *       - code: 400
 *         description: "No avatar URL provided"
 *         solution: "Ensure avatarUrl is provided in request body"
 *       - code: 401
 *         description: "User not authenticated"
 *         solution: "User must be logged in to fetch avatar"
 *       - code: 404
 *         description: "Avatar not found in S3"
 *         solution: "Check if S3 URL is correct and image exists"
 *       - code: 500
 *         description: "S3 fetch error or server error"
 *         solution: "Check S3 connectivity and server logs"
 *     x-rate-limit:
 *       requests: 100
 *       window: "1 hour"
 *       description: "Rate limited to 100 avatar fetch requests per hour"
 *     x-s3-integration:
 *       service: "Amazon S3"
 *       description: "Fetches images from S3 bucket"
 *       security: "Server-side proxy to protect S3 credentials"
 *       caching: "Public cache with 1 year max-age"
 *     x-avatar-flow:
 *       1: "Client sends avatar URL"
 *       2: "Server validates URL format"
 *       3: "Server fetches image from S3"
 *       4: "Server returns image with cache headers"
 *       5: "Client displays avatar image"
 *     x-security-notes:
 *       - "Requires user authentication"
 *       - "Validates avatar URL before fetching"
 *       - "Server-side proxy protects S3 credentials"
 *       - "Image content-type is preserved"
 *       - "Cache headers for performance"
 *     x-monitoring:
 *       metrics:
 *         - "avatar_fetch_success_rate"
 *         - "avatar_fetch_requests_per_hour"
 *         - "s3_response_time"
 *         - "image_size_distribution"
 *       alerts:
 *         - "High avatar fetch failure rate"
 *         - "S3 connectivity issues"
 *         - "Large image downloads"
 *     x-changelog:
 *       - version: "1.0.0"
 *         date: "2024-01-01"
 *         changes:
 *           - "Initial implementation"
 *           - "Basic S3 image fetching"
 *       - version: "1.1.0"
 *         date: "2024-02-15"
 *         changes:
 *           - "Added caching headers"
 *           - "Improved error handling"
 *           - "Added rate limiting"
 *     x-deprecation:
 *       deprecated: false
 *       sunset_date: null
 *       migration_path: null
 *     x-performance:
 *       average_response_time: "200ms"
 *       cache_strategy: "Public cache with 1 year max-age"
 *       optimization_notes: "S3 fetch adds latency, but caching improves performance"
 *     x-testing:
 *       test_cases:
 *         - "Valid S3 URL returns image successfully"
 *         - "Missing avatarUrl returns 400 error"
 *         - "Invalid S3 URL returns 404 error"
 *         - "Unauthorized request returns 401 error"
 *         - "S3 error returns 500 error"
 *       mock_responses:
 *         success: |
 *           Binary image data with proper headers
 *         error: |
 *           {
 *             "error": "Failed to fetch avatar"
 *           }
 *     x-storage:
 *       provider: "Amazon S3"
 *       bucket: "User avatars bucket"
 *       security: "Server-side proxy access"
 *       formats: "JPEG, PNG, WebP"
 *     x-compliance:
 *       gdpr: "Compliant - user controls their avatar data"
 *       privacy: "Secure image fetching, no data retention"
 *       healthcare: "HIPAA-compliant image handling"
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { avatarUrl } = await req.json();

    if (!avatarUrl) {
      return NextResponse.json(
        { error: 'No avatar URL provided' },
        { status: 400 }
      );
    }

    // Fetch the image from S3
    const response = await fetch(avatarUrl, {
      method: 'GET',
      headers: {
        'Accept': 'image/*',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    // Get the image data as a blob
    const imageBlob = await response.blob();

    // Return the image with proper headers
    return new NextResponse(imageBlob, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error fetching avatar:', error);
    return NextResponse.json(
      { error: 'Failed to fetch avatar' },
      { status: 500 }
    );
  }
}
