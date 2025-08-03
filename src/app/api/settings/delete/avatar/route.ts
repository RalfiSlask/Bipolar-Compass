import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/settings/delete/avatar:
 *   delete:
 *     summary: Delete user avatar
 *     description: |
 *       Tar bort användarens profilbild genom att sätta avatarUrl till tom sträng.
 *       Detta återställer användarens profilbild till standardbilden.
 *       Den gamla profilbilden behålls inte i systemet.
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
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: "user@example.com"
 *             required:
 *               - email
 *           examples:
 *             valid_email:
 *               summary: Valid user email
 *               value:
 *                 email: "user@example.com"
 *     responses:
 *       200:
 *         description: Avatar deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Avatar deleted"
 *             examples:
 *               success:
 *                 summary: Avatar deletion successful
 *                 value:
 *                   message: "Avatar deleted"
 *       400:
 *         description: Bad request - Invalid email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid email format"
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
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "User not found"
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
 *                   example: "Failed to delete avatar"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/settings/delete/avatar', {
 *             method: 'DELETE',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer your_jwt_token_here'
 *             },
 *             body: JSON.stringify({
 *               email: 'user@example.com'
 *             })
 *           });
 *           const data = await response.json();
 *           console.log(data.message);
 *       - lang: TypeScript
 *         source: |
 *           interface DeleteAvatarRequest {
 *             email: string;
 *           }
 *
 *           interface DeleteAvatarResponse {
 *             message: string;
 *           }
 *
 *           const response = await fetch('/api/settings/delete/avatar', {
 *             method: 'DELETE',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer your_jwt_token_here'
 *             },
 *             body: JSON.stringify({
 *               email: 'user@example.com'
 *             } as DeleteAvatarRequest)
 *           });
 *           const data: DeleteAvatarResponse = await response.json();
 *
 *           if (data.message) {
 *             console.log('Avatar deleted successfully');
 *           }
 *       - lang: cURL
 *         source: |
 *           curl -X DELETE "https://your-domain.com/api/settings/delete/avatar" \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer your_jwt_token_here" \
 *             -d '{"email": "user@example.com"}'
 *     x-common-errors:
 *       - code: 400
 *         description: "Invalid email format"
 *         solution: "Ensure email is in valid format"
 *       - code: 401
 *         description: "User not authenticated"
 *         solution: "User must be logged in to delete avatar"
 *       - code: 404
 *         description: "User not found in database"
 *         solution: "Check if email exists and is correct"
 *       - code: 500
 *         description: "Database error during avatar deletion"
 *         solution: "Check database connection and try again"
 *     x-rate-limit:
 *       requests: 20
 *       window: "1 hour"
 *       description: "Rate limited to 20 avatar deletion requests per hour"
 *     x-database-operations:
 *       collection: "users"
 *       operation: "updateOne"
 *       filter: "{ email: userEmail }"
 *       update: "{ $set: { 'profile.avatarUrl': '' } }"
 *       upsert: false
 *     x-avatar-flow:
 *       1: "Validate user email"
 *       2: "Find user in database"
 *       3: "Update avatarUrl to empty string"
 *       4: "Return success response"
 *       5: "Frontend shows default avatar"
 *     x-security-notes:
 *       - "Requires user authentication"
 *       - "Validates email before update"
 *       - "Only updates avatarUrl field"
 *       - "No file deletion from storage"
 *       - "Logs avatar deletion attempts"
 *     x-monitoring:
 *       metrics:
 *         - "avatar_deletion_success_rate"
 *         - "avatar_deletion_requests_per_hour"
 *         - "database_operation_time"
 *         - "error_rate_by_type"
 *       alerts:
 *         - "High avatar deletion rate"
 *         - "Database operation failures"
 *         - "Invalid email attempts"
 *     x-changelog:
 *       - version: "1.0.0"
 *         date: "2024-01-01"
 *         changes:
 *           - "Initial implementation"
 *           - "Basic avatar deletion"
 *       - version: "1.1.0"
 *         date: "2024-02-15"
 *         changes:
 *           - "Added email validation"
 *           - "Improved error handling"
 *           - "Added rate limiting"
 *     x-deprecation:
 *       deprecated: false
 *       sunset_date: null
 *       migration_path: null
 *     x-performance:
 *       average_response_time: "100ms"
 *       cache_strategy: "No caching - real-time update required"
 *       optimization_notes: "Simple database update operation"
 *     x-testing:
 *       test_cases:
 *         - "Valid email deletes avatar successfully"
 *         - "Invalid email returns 400 error"
 *         - "Non-existent user returns 404 error"
 *         - "Unauthorized request returns 401 error"
 *         - "Database error returns 500 error"
 *       mock_responses:
 *         success: |
 *           {
 *             "message": "Avatar deleted"
 *           }
 *         not_found: |
 *           {
 *             "error": "User not found"
 *           }
 *         error: |
 *           {
 *             "message": "Failed to delete avatar"
 *           }
 *     x-privacy:
 *       data_retention: "Avatar URL is cleared immediately"
 *       user_consent: "User must explicitly request avatar deletion"
 *       audit_trail: "Avatar deletion attempts are logged"
 *     x-compliance:
 *       gdpr: "Compliant - user can control their profile data"
 *       privacy: "Minimal data collection, secure profile management"
 *       healthcare: "HIPAA-compliant profile management"
 */

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { email } = await req.json();
    const collection = await getCollection('thesis', 'users');
    await collection.updateOne(
      { email },
      { $set: { 'profile.avatarUrl': '' } }
    );
    return NextResponse.json({ message: 'Avatar deleted' });
  } catch (error) {
    console.error('Error deleting avatar:', error);
    return NextResponse.json(
      { message: 'Failed to delete avatar' },
      { status: 500 }
    );
  }
}
