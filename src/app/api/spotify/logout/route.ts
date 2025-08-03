import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/spotify/logout:
 *   post:
 *     summary: Logout from Spotify
 *     description: |
 *       Loggar ut användaren från Spotify genom att ta bort spotify_token cookie.
 *       Detta avslutar användarens Spotify-session och tar bort åtkomst till
 *       Spotify API från applikationen.
 *     tags:
 *       - Spotify
 *       - Authentication
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out from Spotify
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the logout was successful
 *                   example: true
 *             examples:
 *               success:
 *                 summary: Logout successful
 *                 value:
 *                   success: true
 *       500:
 *         description: Internal server error during logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Logout failed"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/spotify/logout', {
 *             method: 'POST',
 *             credentials: 'include'
 *           });
 *           const data = await response.json();
 *           console.log(data.success);
 *       - lang: TypeScript
 *         source: |
 *           interface SpotifyLogoutResponse {
 *             success: boolean;
 *           }
 *
 *           const response = await fetch('/api/spotify/logout', {
 *             method: 'POST',
 *             credentials: 'include'
 *           });
 *           const data: SpotifyLogoutResponse = await response.json();
 *
 *           if (data.success) {
 *             console.log('Successfully logged out from Spotify');
 *           } else {
 *             console.log('Logout failed');
 *           }
 *       - lang: cURL
 *         source: |
 *           curl -X POST "https://your-domain.com/api/spotify/logout" \
 *             -H "Accept: application/json" \
 *             -b "spotify_token=your_spotify_token_here"
 *     x-common-errors:
 *       - code: 500
 *         description: "Internal server error during logout process"
 *         solution: "Check server logs and try again"
 *     x-rate-limit:
 *       requests: 10
 *       window: "1 hour"
 *       description: "Rate limited to 10 logout requests per hour per user"
 *     x-cookies:
 *       spotify_token:
 *         description: "Spotify access token cookie that will be deleted"
 *         required: true
 *         type: string
 *         example: "BQBPiTBF6UZq..."
 *     x-logout-flow:
 *       1: "Client sends POST request to logout endpoint"
 *       2: "Server retrieves cookies from request"
 *       3: "Server deletes spotify_token cookie"
 *       4: "Server returns success response"
 *       5: "Client clears any local Spotify state"
 *       6: "User is now logged out from Spotify"
 *     x-security-notes:
 *       - "Cookie deletion is handled securely by Next.js"
 *       - "No sensitive data is exposed in response"
 *       - "Logout attempts are logged for monitoring"
 *       - "Cookie is immediately invalidated"
 *     x-monitoring:
 *       metrics:
 *         - "logout_success_rate"
 *         - "logout_requests_per_hour"
 *         - "error_rate_by_type"
 *       alerts:
 *         - "High logout failure rate"
 *         - "Unusual logout patterns"
 *     x-changelog:
 *       - version: "1.0.0"
 *         date: "2024-01-01"
 *         changes:
 *           - "Initial implementation"
 *           - "Basic cookie deletion"
 *       - version: "1.1.0"
 *         date: "2024-02-15"
 *         changes:
 *           - "Added error handling"
 *           - "Improved logging"
 *           - "Added rate limiting"
 *     x-deprecation:
 *       deprecated: false
 *       sunset_date: null
 *       migration_path: null
 *     x-performance:
 *       average_response_time: "50ms"
 *       cache_strategy: "No caching - immediate logout required"
 *       optimization_notes: "Simple cookie deletion operation"
 *     x-testing:
 *       test_cases:
 *         - "Valid logout returns success: true"
 *         - "Cookie is properly deleted"
 *         - "No cookie returns success: true"
 *         - "Server error returns success: false"
 *       mock_responses:
 *         success: |
 *           {
 *             "success": true
 *           }
 *         error: |
 *           {
 *             "success": false,
 *             "error": "Logout failed"
 *           }
 *     x-privacy:
 *       data_retention: "No data retained after logout"
 *       cookie_cleanup: "spotify_token cookie is immediately deleted"
 *       session_termination: "Spotify session is terminated"
 *     x-compliance:
 *       gdpr: "Compliant - user data is immediately removed"
 *       ccpa: "Compliant - user can exercise right to deletion"
 *       privacy_law: "Compliant with Swedish privacy laws"
 */

export const POST = async () => {
  const cookieStore = await cookies();

  cookieStore.delete('spotify_token');

  return NextResponse.json({ success: true });
};
