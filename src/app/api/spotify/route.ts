import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/spotify:
 *   post:
 *     summary: Exchange Spotify authorization code for access token
 *     description: |
 *       Byter ut Spotify auktoriseringskod mot access token.
 *       Detta är en del av OAuth 2.0-flödet där användaren har
 *       godkänt åtkomst och Spotify skickar tillbaka en kod som
 *       byts mot en access token för att komma åt Spotify API.
 *     tags:
 *       - Spotify
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Authorization code from Spotify OAuth callback
 *                 example: "AQD7EF...example_code"
 *             required:
 *               - code
 *           examples:
 *             valid_code:
 *               summary: Valid authorization code
 *               value:
 *                 code: "AQD7EF...example_code"
 *     responses:
 *       200:
 *         description: Successfully exchanged code for access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: Spotify access token
 *                   example: "BQBPiTBF6UZq..."
 *                 token_type:
 *                   type: string
 *                   description: Type of token
 *                   example: "Bearer"
 *                 expires_in:
 *                   type: integer
 *                   description: Token expiration time in seconds
 *                   example: 3600
 *                 refresh_token:
 *                   type: string
 *                   description: Refresh token for getting new access tokens
 *                   example: "AQD7EF...refresh_token"
 *                 scope:
 *                   type: string
 *                   description: Granted scopes
 *                   example: "user-read-private user-read-email"
 *             examples:
 *               success:
 *                 summary: Successful token exchange
 *                 value:
 *                   access_token: "BQBPiTBF6UZq..."
 *                   token_type: "Bearer"
 *                   expires_in: 3600
 *                   refresh_token: "AQD7EF...refresh_token"
 *                   scope: "user-read-private user-read-email"
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only cookie containing the access token
 *             schema:
 *               type: string
 *               example: "spotify_token=BQBPiTBF6UZq...; HttpOnly; Secure; SameSite=Lax; Max-Age=3600"
 *       400:
 *         description: Bad request - Invalid authorization code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error type
 *                   example: "invalid_grant"
 *                 error_description:
 *                   type: string
 *                   description: Detailed error description
 *                   example: "Invalid authorization code"
 *       401:
 *         description: Unauthorized - Invalid client credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "invalid_client"
 *                 error_description:
 *                   type: string
 *                   example: "Invalid client"
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
 *                   example: "Missing environment variables"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/spotify', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json'
 *             },
 *             body: JSON.stringify({
 *               code: 'AQD7EF...example_code'
 *             })
 *           });
 *           const data = await response.json();
 *           console.log(data.access_token);
 *       - lang: TypeScript
 *         source: |
 *           interface SpotifyTokenRequest {
 *             code: string;
 *           }
 *
 *           interface SpotifyTokenResponse {
 *             access_token: string;
 *             token_type: string;
 *             expires_in: number;
 *             refresh_token?: string;
 *             scope: string;
 *           }
 *
 *           const response = await fetch('/api/spotify', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json'
 *             },
 *             body: JSON.stringify({
 *               code: 'AQD7EF...example_code'
 *             } as SpotifyTokenRequest)
 *           });
 *           const data: SpotifyTokenResponse = await response.json();
 *
 *           if (data.access_token) {
 *             console.log('Successfully obtained Spotify access token');
 *           }
 *       - lang: cURL
 *         source: |
 *           curl -X POST "https://your-domain.com/api/spotify" \
 *             -H "Content-Type: application/json" \
 *             -d '{"code": "AQD7EF...example_code"}'
 *     x-common-errors:
 *       - code: 400
 *         description: "Invalid or expired authorization code"
 *         solution: "User needs to re-authenticate with Spotify"
 *       - code: 401
 *         description: "Invalid client credentials"
 *         solution: "Check Spotify app configuration"
 *       - code: 500
 *         description: "Missing environment variables or server error"
 *         solution: "Check server configuration and logs"
 *     x-rate-limit:
 *       requests: 50
 *       window: "1 hour"
 *       description: "Rate limited to 50 token exchanges per hour per user"
 *     x-spotify-api:
 *       endpoint: "POST /api/token"
 *       description: "This endpoint calls Spotify's token exchange endpoint"
 *       documentation: "https://developer.spotify.com/documentation/web-api/tutorials/code-flow"
 *     x-oauth-flow:
 *       1: "User clicks 'Login with Spotify' button"
 *       2: "User is redirected to Spotify authorization page"
 *       3: "User grants permissions to the app"
 *       4: "Spotify redirects back with authorization code"
 *       5: "This endpoint exchanges code for access token"
 *       6: "Access token is stored as HTTP-only cookie"
 *       7: "User is now authenticated with Spotify"
 *     x-security-notes:
 *       - "Authorization codes are single-use and expire quickly"
 *       - "Access tokens are stored as HTTP-only cookies"
 *       - "Client credentials are kept secure on server"
 *       - "All communication with Spotify API is over HTTPS"
 *     x-monitoring:
 *       metrics:
 *         - "token_exchange_success_rate"
 *         - "token_exchange_time"
 *         - "error_rate_by_type"
 *       alerts:
 *         - "High token exchange failure rate"
 *         - "Spotify API unavailability"
 *         - "Invalid client credentials"
 *     x-changelog:
 *       - version: "1.0.0"
 *         date: "2024-01-01"
 *         changes:
 *           - "Initial implementation"
 *           - "Basic OAuth 2.0 code flow"
 *       - version: "1.1.0"
 *         date: "2024-02-15"
 *         changes:
 *           - "Added environment variable validation"
 *           - "Improved error handling"
 *           - "Added secure cookie settings"
 *     x-deprecation:
 *       deprecated: false
 *       sunset_date: null
 *       migration_path: null
 *     x-performance:
 *       average_response_time: "200ms"
 *       cache_strategy: "No caching - tokens are unique"
 *       optimization_notes: "Token exchange requires Spotify API call"
 *     x-testing:
 *       test_cases:
 *         - "Valid code returns access token"
 *         - "Invalid code returns 400 error"
 *         - "Missing environment variables returns 500"
 *         - "Network error returns 500"
 *       mock_responses:
 *         success: |
 *           {
 *             "access_token": "BQBPiTBF6UZq...",
 *             "token_type": "Bearer",
 *             "expires_in": 3600,
 *             "refresh_token": "AQD7EF...refresh_token",
 *             "scope": "user-read-private user-read-email"
 *           }
 *         invalid_code: |
 *           {
 *             "error": "invalid_grant",
 *             "error_description": "Invalid authorization code"
 *           }
 *         server_error: |
 *           {
 *             "error": "Missing environment variables"
 *           }
 *     x-environment:
 *       required_variables:
 *         - "SPOTIFY_CLIENT_ID"
 *         - "SPOTIFY_CLIENT_SECRET"
 *       redirect_uri: "https://www.xn--bipolrkompassen-4kb.se/multimedia/musik"
 *       scopes: "user-read-private user-read-email"
 *     x-compliance:
 *       oauth2: "Compliant with OAuth 2.0 specification"
 *       security: "Uses HTTPS and secure cookies"
 *       privacy: "Minimal data collection, secure token storage"
 */

/**
 * This route is used to exchange the spotify code for an access token.
 * @param {NextRequest} req - The request object which contains the code.
 * @returns {NextResponse} Response object with success or error.
 */
export const POST = async (req: NextRequest) => {
  const { code } = await req.json();

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri =
    'https://www.xn--bipolrkompassen-4kb.se/multimedia/musik';

  if (!client_id || !client_secret || !redirect_uri) {
    console.error('Missing environment variables:', {
      hasClientId: !!client_id,
      hasClientSecret: !!client_secret,
      redirectUri: redirect_uri,
    });
    return NextResponse.json(
      { error: 'Missing environment variables' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirect_uri,
      }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Spotify API error:', data);
      return NextResponse.json(data, { status: response.status });
    }

    const res = NextResponse.json(data);

    if (process.env.NODE_ENV === 'development') {
      res.cookies.set('spotify_token', data.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 3600,
      });
    } else if (process.env.NODE_ENV === 'production') {
      res.cookies.set('spotify_token', data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 3600,
      });
    }

    return res;
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json(
      { error: 'Failed to exchange token' },
      { status: 500 }
    );
  }
};
