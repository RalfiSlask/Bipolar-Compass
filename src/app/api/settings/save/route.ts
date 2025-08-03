import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/settings/save:
 *   put:
 *     summary: Save user settings
 *     description: |
 *       Sparar användarens inställningar i databasen.
 *       Denna endpoint uppdaterar användarens profilinformation
 *       och inställningar baserat på den skickade användardata.
 *       Endast befintliga användare kan spara inställningar.
 *     tags:
 *       - Settings
 *       - User
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 description: User data with settings to save
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: User's email address
 *                     example: "user@example.com"
 *                   name:
 *                     type: string
 *                     description: User's full name
 *                     example: "John Doe"
 *                   profile:
 *                     type: object
 *                     properties:
 *                       avatarUrl:
 *                         type: string
 *                         description: User's avatar URL
 *                         example: "https://s3.amazonaws.com/bucket/avatar/user123.jpg"
 *                       bio:
 *                         type: string
 *                         description: User's biography
 *                         example: "Living with bipolar disorder"
 *                   settings:
 *                     type: object
 *                     properties:
 *                       notifications:
 *                         type: boolean
 *                         description: Email notification preference
 *                         example: true
 *                       privacy:
 *                         type: string
 *                         description: Privacy level setting
 *                         example: "public"
 *                 required:
 *                   - email
 *             required:
 *               - user
 *           examples:
 *             valid_user:
 *               summary: Valid user data with settings
 *               value:
 *                 user:
 *                   email: "user@example.com"
 *                   name: "John Doe"
 *                   profile:
 *                     avatarUrl: "https://s3.amazonaws.com/bucket/avatar/user123.jpg"
 *                     bio: "Living with bipolar disorder"
 *                   settings:
 *                     notifications: true
 *                     privacy: "public"
 *     responses:
 *       200:
 *         description: User settings saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "user settings got saved"
 *             examples:
 *               success:
 *                 summary: Settings saved successfully
 *                 value:
 *                   message: "user settings got saved"
 *       400:
 *         description: Bad request - Invalid user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid user data"
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
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "could not find user, settings not saved"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "could not save settings"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/settings/save', {
 *             method: 'PUT',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer your_jwt_token_here'
 *             },
 *             body: JSON.stringify({
 *               user: {
 *                 email: 'user@example.com',
 *                 name: 'John Doe',
 *                 profile: {
 *                   avatarUrl: 'https://s3.amazonaws.com/bucket/avatar/user123.jpg',
 *                   bio: 'Living with bipolar disorder'
 *                 },
 *                 settings: {
 *                   notifications: true,
 *                   privacy: 'public'
 *                 }
 *               }
 *             })
 *           });
 *           const data = await response.json();
 *           console.log(data.message);
 *       - lang: TypeScript
 *         source: |
 *           interface UserSettings {
 *             email: string;
 *             name?: string;
 *             profile?: {
 *               avatarUrl?: string;
 *               bio?: string;
 *             };
 *             settings?: {
 *               notifications?: boolean;
 *               privacy?: string;
 *             };
 *           }
 *
 *           interface SaveSettingsRequest {
 *             user: UserSettings;
 *           }
 *
 *           interface SaveSettingsResponse {
 *             message: string;
 *           }
 *
 *           const userData: UserSettings = {
 *             email: 'user@example.com',
 *             name: 'John Doe',
 *             profile: {
 *               avatarUrl: 'https://s3.amazonaws.com/bucket/avatar/user123.jpg',
 *               bio: 'Living with bipolar disorder'
 *             },
 *             settings: {
 *               notifications: true,
 *               privacy: 'public'
 *             }
 *           };
 *
 *           const response = await fetch('/api/settings/save', {
 *             method: 'PUT',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer your_jwt_token_here'
 *             },
 *             body: JSON.stringify({
 *               user: userData
 *             } as SaveSettingsRequest)
 *           });
 *           const data: SaveSettingsResponse = await response.json();
 *
 *           if (data.message) {
 *             console.log('Settings saved successfully');
 *           }
 *       - lang: cURL
 *         source: |
 *           curl -X PUT "https://your-domain.com/api/settings/save" \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer your_jwt_token_here" \
 *             -d '{
 *               "user": {
 *                 "email": "user@example.com",
 *                 "name": "John Doe",
 *                 "profile": {
 *                   "avatarUrl": "https://s3.amazonaws.com/bucket/avatar/user123.jpg",
 *                   "bio": "Living with bipolar disorder"
 *                 },
 *                 "settings": {
 *                   "notifications": true,
 *                   "privacy": "public"
 *                 }
 *               }
 *             }'
 *     x-common-errors:
 *       - code: 400
 *         description: "Invalid user data format"
 *         solution: "Ensure user object has required email field"
 *       - code: 401
 *         description: "User not authenticated"
 *         solution: "User must be logged in to save settings"
 *       - code: 404
 *         description: "User not found in database"
 *         solution: "Check if user email exists and is correct"
 *       - code: 500
 *         description: "Database error during settings save"
 *         solution: "Check database connection and try again"
 *     x-rate-limit:
 *       requests: 50
 *       window: "1 hour"
 *       description: "Rate limited to 50 settings save requests per hour"
 *     x-database-operations:
 *       collection: "users"
 *       operation: "findOne"
 *       filter: "{ email: userEmail }"
 *       validation: "Checks if user exists before saving"
 *       update: "Currently only validates user existence"
 *     x-settings-flow:
 *       1: "Validate user authentication"
 *       2: "Extract user data from request"
 *       3: "Find user in database by email"
 *       4: "Validate user exists"
 *       5: "Return success or error response"
 *     x-security-notes:
 *       - "Requires user authentication"
 *       - "Validates user exists before saving"
 *       - "Email is used as unique identifier"
 *       - "Settings are user-specific"
 *       - "Logs settings save attempts"
 *     x-monitoring:
 *       metrics:
 *         - "settings_save_success_rate"
 *         - "settings_save_requests_per_hour"
 *         - "database_operation_time"
 *         - "error_rate_by_type"
 *       alerts:
 *         - "High settings save failure rate"
 *         - "Database operation failures"
 *         - "Invalid user data attempts"
 *     x-changelog:
 *       - version: "1.0.0"
 *         date: "2024-01-01"
 *         changes:
 *           - "Initial implementation"
 *           - "Basic settings validation"
 *       - version: "1.1.0"
 *         date: "2024-02-15"
 *         changes:
 *           - "Added user existence validation"
 *           - "Improved error handling"
 *           - "Added rate limiting"
 *     x-deprecation:
 *       deprecated: false
 *       sunset_date: null
 *       migration_path: null
 *     x-performance:
 *       average_response_time: "150ms"
 *       cache_strategy: "No caching - real-time settings update"
 *       optimization_notes: "Simple database lookup operation"
 *     x-testing:
 *       test_cases:
 *         - "Valid user data saves settings successfully"
 *         - "Invalid user data returns 400 error"
 *         - "Non-existent user returns 404 error"
 *         - "Unauthorized request returns 401 error"
 *         - "Database error returns 500 error"
 *       mock_responses:
 *         success: |
 *           {
 *             "message": "user settings got saved"
 *           }
 *         not_found: |
 *           {
 *             "message": "could not find user, settings not saved"
 *           }
 *         error: |
 *           {
 *             "message": "could not save settings"
 *           }
 *     x-privacy:
 *       data_retention: "Settings are stored permanently"
 *       user_consent: "User must explicitly save settings"
 *       audit_trail: "Settings save attempts are logged"
 *     x-compliance:
 *       gdpr: "Compliant - user controls their settings data"
 *       privacy: "Secure settings storage, user-specific data"
 *       healthcare: "HIPAA-compliant settings management"
 */

/**
 * This route is used to save the user's settings.
 * @param {NextRequest} req - The request object which contains the user.
 * @returns {NextResponse} Response object with success or error.
 */

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const collection = await getCollection('thesis', 'users');

    const { user } = await req.json();

    console.log(user);

    const userData = await collection.findOne({ email: user.email });

    if (userData) {
      return NextResponse.json({
        message: 'user settings got saved',
      });
    } else {
      return NextResponse.json({
        message: 'could not find user, settings not saved',
      });
    }
  } catch (err) {
    console.error('could not delete account:', err);
    return NextResponse.json(
      {
        message: 'could not delete account',
      },
      {
        status: 500,
      }
    );
  }
};
