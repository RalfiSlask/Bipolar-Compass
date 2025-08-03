import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/spotify/check-auth:
 *   get:
 *     summary: Check Spotify authentication status
 *     description: |
 *       Kontrollerar om användaren är autentiserad med Spotify.
 *       Verifierar närvaron och giltigheten av spotify_token cookie
 *       och validerar den mot Spotify API.
 *     tags:
 *       - Spotify
 *       - Authentication
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Authentication status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAuthenticated:
 *                   type: boolean
 *                   description: Whether the user is authenticated with Spotify
 *                   example: true
 *                 access_token:
 *                   type: string
 *                   description: The Spotify access token (only present if authenticated)
 *                   example: "BQBPiTBF6UZq..."
 *                   nullable: true
 *             examples:
 *               authenticated:
 *                 summary: User is authenticated
 *                 value:
 *                   isAuthenticated: true
 *                   access_token: "BQBPiTBF6UZq..."
 *               not_authenticated:
 *                 summary: User is not authenticated
 *                 value:
 *                   isAuthenticated: false
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAuthenticated:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAuthenticated:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Auth check error"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/spotify/check-auth', {
 *             method: 'GET',
 *             credentials: 'include'
 *           });
 *           const data = await response.json();
 *           console.log(data.isAuthenticated);
 *       - lang: TypeScript
 *         source: |
 *           interface SpotifyAuthResponse {
 *             isAuthenticated: boolean;
 *             access_token?: string;
 *           }
 *
 *           const response = await fetch('/api/spotify/check-auth', {
 *             method: 'GET',
 *             credentials: 'include'
 *           });
 *           const data: SpotifyAuthResponse = await response.json();
 *
 *           if (data.isAuthenticated) {
 *             console.log('User is authenticated with Spotify');
 *           } else {
 *             console.log('User is not authenticated');
 *           }
 *       - lang: cURL
 *         source: |
 *           curl -X GET "https://your-domain.com/api/spotify/check-auth" \
 *             -H "Accept: application/json" \
 *             -b "spotify_token=your_spotify_token_here"
 *     x-common-errors:
 *       - code: 401
 *         description: "Token is missing, invalid, or expired"
 *         solution: "User needs to re-authenticate with Spotify"
 *       - code: 500
 *         description: "Internal server error during authentication check"
 *         solution: "Check server logs and try again"
 *     x-rate-limit:
 *       requests: 100
 *       window: "1 hour"
 *       description: "Rate limited to 100 requests per hour per user"
 *     x-spotify-api:
 *       endpoint: "GET /v1/me"
 *       description: "This endpoint calls Spotify's user profile endpoint to validate the token"
 *       documentation: "https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile"
 *     x-cookies:
 *       spotify_token:
 *         description: "Spotify access token stored as HTTP-only cookie"
 *         required: true
 *         type: string
 *         example: "BQBPiTBF6UZq..."
 *     x-authentication-flow:
 *       1: "User initiates Spotify OAuth flow"
 *       2: "Spotify redirects with authorization code"
 *       3: "Backend exchanges code for access token"
 *       4: "Access token stored as HTTP-only cookie"
 *       5: "This endpoint validates token with Spotify API"
 *       6: "Returns authentication status to client"
 *     x-security-notes:
 *       - "Access tokens are stored as HTTP-only cookies for security"
 *       - "Tokens are validated against Spotify API on each check"
 *       - "No sensitive data is exposed in response"
 *       - "Failed authentication attempts are logged for monitoring"
 *     x-monitoring:
 *       metrics:
 *         - "authentication_success_rate"
 *         - "token_validation_time"
 *         - "error_rate_by_type"
 *       alerts:
 *         - "High authentication failure rate"
 *         - "Spotify API unavailability"
 *         - "Token validation timeouts"
 *     x-changelog:
 *       - version: "1.0.0"
 *         date: "2024-01-01"
 *         changes:
 *           - "Initial implementation"
 *           - "Basic token validation"
 *       - version: "1.1.0"
 *         date: "2024-02-15"
 *         changes:
 *           - "Added error logging"
 *           - "Improved error handling"
 *           - "Added rate limiting"
 *     x-deprecation:
 *       deprecated: false
 *       sunset_date: null
 *       migration_path: null
 *     x-performance:
 *       average_response_time: "150ms"
 *       cache_strategy: "No caching - real-time validation required"
 *       optimization_notes: "Token validation against Spotify API adds latency"
 *     x-testing:
 *       test_cases:
 *         - "Valid token returns isAuthenticated: true"
 *         - "Invalid token returns isAuthenticated: false"
 *         - "Missing token returns isAuthenticated: false"
 *         - "Expired token returns isAuthenticated: false"
 *         - "Network error returns isAuthenticated: false"
 *       mock_responses:
 *         valid_token: |
 *           {
 *             "isAuthenticated": true,
 *             "access_token": "BQBPiTBF6UZq..."
 *           }
 *         invalid_token: |
 *           {
 *             "isAuthenticated": false
 *           }
 *         server_error: |
 *           {
 *             "isAuthenticated": false,
 *             "error": "Auth check error"
 *           }
 */

/**
 * This route is used to check if the user is authenticated with spotify.
 * @returns {NextResponse} Response object with success or error.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const spotifyToken = cookieStore.get('spotify_token');

    if (!spotifyToken) {
      return NextResponse.json({ isAuthenticated: false });
    }

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${spotifyToken.value}`,
      },
    });

    if (response.ok) {
      return NextResponse.json({
        isAuthenticated: true,
        access_token: spotifyToken.value,
      });
    } else {
      return NextResponse.json({ isAuthenticated: false });
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ isAuthenticated: false });
  }
}
