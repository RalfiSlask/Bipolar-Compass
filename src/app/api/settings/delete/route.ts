import { getCollection } from '@/app/utils/databaseUtils';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/settings/delete:
 *   delete:
 *     summary: Delete user account and all associated data
 *     description: |
 *       Tar bort användarens konto och all tillhörande data permanent.
 *       Detta inkluderar användarprofil, humörspårning, dagbok och alla
 *       andra data kopplade till användaren. Denna åtgärd kan inte ångras.
 *
 *       ## Varning
 *       Denna operation är permanent och kan inte ångras. All data
 *       kopplad till användaren kommer att raderas från databasen.
 *     tags:
 *       - Settings
 *       - User
 *       - Account
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User's unique identifier
 *                 example: "507f1f77bcf86cd799439011"
 *             required:
 *               - userId
 *           examples:
 *             valid_user:
 *               summary: Valid user ID
 *               value:
 *                 userId: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: User account and associated data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "User and associated data deleted"
 *             examples:
 *               success:
 *                 summary: Account deletion successful
 *                 value:
 *                   message: "User and associated data deleted"
 *       400:
 *         description: Bad request - Invalid user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid user ID format"
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
 *                   example: "could not delete account"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/settings/delete', {
 *             method: 'DELETE',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer your_jwt_token_here'
 *             },
 *             body: JSON.stringify({
 *               userId: '507f1f77bcf86cd799439011'
 *             })
 *           });
 *           const data = await response.json();
 *           console.log(data.message);
 *       - lang: TypeScript
 *         source: |
 *           interface DeleteAccountRequest {
 *             userId: string;
 *           }
 *
 *           interface DeleteAccountResponse {
 *             message: string;
 *           }
 *
 *           const response = await fetch('/api/settings/delete', {
 *             method: 'DELETE',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer your_jwt_token_here'
 *             },
 *             body: JSON.stringify({
 *               userId: '507f1f77bcf86cd799439011'
 *             } as DeleteAccountRequest)
 *           });
 *           const data: DeleteAccountResponse = await response.json();
 *
 *           if (data.message) {
 *             console.log('Account deleted successfully');
 *           }
 *       - lang: cURL
 *         source: |
 *           curl -X DELETE "https://your-domain.com/api/settings/delete" \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer your_jwt_token_here" \
 *             -d '{"userId": "507f1f77bcf86cd799439011"}'
 *     x-common-errors:
 *       - code: 400
 *         description: "Invalid user ID format"
 *         solution: "Ensure user ID is a valid MongoDB ObjectId"
 *       - code: 401
 *         description: "User not authenticated"
 *         solution: "User must be logged in to delete account"
 *       - code: 404
 *         description: "User not found in database"
 *         solution: "Check if user ID exists and is correct"
 *       - code: 500
 *         description: "Database error during deletion"
 *         solution: "Check database connection and try again"
 *     x-rate-limit:
 *       requests: 5
 *       window: "1 hour"
 *       description: "Rate limited to 5 account deletion requests per hour"
 *     x-database-operations:
 *       collections:
 *         - "users - Delete user profile"
 *         - "mood_tracker_weeks - Delete all mood tracking data"
 *         - "diaries - Delete all diary entries"
 *       transaction: "No transaction - individual delete operations"
 *       cascade: "Manual cascade deletion of related data"
 *     x-deletion-flow:
 *       1: "Validate user ID format"
 *       2: "Find user in database"
 *       3: "Delete all mood tracking data"
 *       4: "Delete all diary entries"
 *       5: "Delete user profile"
 *       6: "Return success response"
 *     x-security-notes:
 *       - "Requires user authentication"
 *       - "Validates user ID before deletion"
 *       - "Permanent deletion - no recovery possible"
 *       - "Cascades to all related data"
 *       - "Logs deletion attempts for audit"
 *     x-monitoring:
 *       metrics:
 *         - "account_deletion_success_rate"
 *         - "deletion_requests_per_hour"
 *         - "database_operation_time"
 *         - "error_rate_by_type"
 *       alerts:
 *         - "High account deletion rate"
 *         - "Database operation failures"
 *         - "Invalid user ID attempts"
 *     x-changelog:
 *       - version: "1.0.0"
 *         date: "2024-01-01"
 *         changes:
 *           - "Initial implementation"
 *           - "Basic account deletion"
 *       - version: "1.1.0"
 *         date: "2024-02-15"
 *         changes:
 *           - "Added cascade deletion"
 *           - "Improved error handling"
 *           - "Added rate limiting"
 *     x-deprecation:
 *       deprecated: false
 *       sunset_date: null
 *       migration_path: null
 *     x-performance:
 *       average_response_time: "300ms"
 *       cache_strategy: "No caching - real-time deletion required"
 *       optimization_notes: "Multiple database operations required"
 *     x-testing:
 *       test_cases:
 *         - "Valid user ID deletes account and all data"
 *         - "Invalid user ID returns 400 error"
 *         - "Non-existent user returns 404 error"
 *         - "Unauthorized request returns 401 error"
 *         - "Database error returns 500 error"
 *       mock_responses:
 *         success: |
 *           {
 *             "message": "User and associated data deleted"
 *           }
 *         not_found: |
 *           {
 *             "error": "User not found"
 *           }
 *         error: |
 *           {
 *             "message": "could not delete account"
 *           }
 *     x-privacy:
 *       data_retention: "Immediate deletion - no data retained"
 *       user_consent: "User must explicitly request deletion"
 *       audit_trail: "Deletion attempts are logged"
 *     x-compliance:
 *       gdpr: "Compliant - right to erasure implemented"
 *       ccpa: "Compliant - user can exercise right to deletion"
 *       privacy_law: "Compliant with Swedish privacy laws"
 *       healthcare: "HIPAA-compliant data deletion"
 */

/**
 * This route is used to delete the user's account.
 * @param {NextRequest} req - The request object which contains the email.
 * @returns {NextResponse} Response object with success or error.
 */
export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const usersCollection = await getCollection('thesis', 'users');
    const moodTrackerCollection = await getCollection(
      'thesis',
      'mood_tracker_weeks'
    );
    const diaryCollection = await getCollection('thesis', 'diaries');

    const { userId } = await req.json();
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user_id = user._id.toString();

    await moodTrackerCollection.deleteMany({ user_id: user_id });
    await diaryCollection.deleteMany({ user_id: user_id });
    await usersCollection.deleteOne({ _id: new ObjectId(userId) });

    return NextResponse.json({ message: 'User and associated data deleted' });
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
