import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/settings/save/notifications:
 *   post:
 *     summary: Save user notification settings
 *     description: Updates the user's notification preferences including email notifications and relative notifications settings.
 *     tags:
 *       - Settings
 *       - Notifications
 *       - User Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailNotification
 *               - email
 *               - relativeNotifications
 *             properties:
 *               emailNotification:
 *                 type: boolean
 *                 description: Whether email notifications are enabled for the user
 *                 example: true
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address for identification
 *                 example: "user@example.com"
 *               relativeNotifications:
 *                 type: object
 *                 description: Notification settings for relatives/caregivers
 *                 properties:
 *                   enabled:
 *                     type: boolean
 *                     description: Whether relative notifications are enabled
 *                     example: true
 *                   relatives:
 *                     type: array
 *                     description: Array of relatives who should receive notifications
 *                     items:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           format: email
 *                           description: Relative's email address
 *                           example: "anna.andersson@example.com"
 *                         name:
 *                           type: string
 *                           description: Relative's name
 *                           example: "Anna Andersson"
 *                         relationship:
 *                           type: string
 *                           description: Relationship to the user
 *                           example: "Partner"
 *                         notificationTypes:
 *                           type: array
 *                           description: Types of notifications this relative should receive
 *                           items:
 *                             type: string
 *                             enum: ["mood_changes", "medication_reminders", "appointments", "emergency_alerts"]
 *                           example: ["mood_changes", "medication_reminders"]
 *                 example:
 *                   enabled: true
 *                   relatives:
 *                     - email: "anna.andersson@example.com"
 *                       name: "Anna Andersson"
 *                       relationship: "Partner"
 *                       notificationTypes: ["mood_changes", "medication_reminders"]
 *                     - email: "erik.eriksson@example.com"
 *                       name: "Erik Eriksson"
 *                       relationship: "Brother"
 *                       notificationTypes: ["emergency_alerts"]
 *     responses:
 *       200:
 *         description: Notification settings saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Notifications saved"
 *                 user:
 *                   type: object
 *                   description: Updated user object with notification settings
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: MongoDB ObjectId
 *                       example: "507f1f77bcf86cd799439011"
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: User's email address
 *                       example: "user@example.com"
 *                     settings:
 *                       type: object
 *                       properties:
 *                         notifications_enabled:
 *                           type: boolean
 *                           description: Whether email notifications are enabled
 *                           example: true
 *                         relatives:
 *                           type: object
 *                           description: Relative notification settings
 *                           example:
 *                             enabled: true
 *                             relatives:
 *                               - email: "anna.andersson@example.com"
 *                                 name: "Anna Andersson"
 *                                 relationship: "Partner"
 *                                 notificationTypes: ["mood_changes", "medication_reminders"]
 *       400:
 *         description: Bad request - Invalid data format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid notification settings format"
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
 *                   example: "Could not save notifications"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const notificationData = {
 *             emailNotification: true,
 *             email: "user@example.com",
 *             relativeNotifications: {
 *               enabled: true,
 *               relatives: [
 *                 {
 *                   email: "anna.andersson@example.com",
 *                   name: "Anna Andersson",
 *                   relationship: "Partner",
 *                   notificationTypes: ["mood_changes", "medication_reminders"]
 *                 },
 *                 {
 *                   email: "erik.eriksson@example.com",
 *                   name: "Erik Eriksson",
 *                   relationship: "Brother",
 *                   notificationTypes: ["emergency_alerts"]
 *                 }
 *               ]
 *             }
 *           };
 *
 *           const response = await fetch('/api/settings/save/notifications', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer YOUR_TOKEN'
 *             },
 *             body: JSON.stringify(notificationData)
 *           });
 *
 *           const data = await response.json();
 *           console.log('Notification save result:', data.message);
 *           console.log('Updated user:', data.user);
 *       - lang: cURL
 *         source: |
 *           curl -X POST /api/settings/save/notifications \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -d '{
 *               "emailNotification": true,
 *               "email": "user@example.com",
 *               "relativeNotifications": {
 *                 "enabled": true,
 *                 "relatives": [
 *                   {
 *                     "email": "anna.andersson@example.com",
 *                     "name": "Anna Andersson",
 *                     "relationship": "Partner",
 *                     "notificationTypes": ["mood_changes", "medication_reminders"]
 *                   }
 *                 ]
 *               }
 *             }'
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { emailNotification, email, relativeNotifications } =
      await req.json();
    const collection = await getCollection('thesis', 'users');

    const result = await collection.updateOne(
      { email: email },
      {
        $set: {
          'settings.notifications_enabled': emailNotification,
          'settings.relatives': relativeNotifications,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const updatedUser = await collection.findOne({ email: email });

    return NextResponse.json({
      message: 'Notifications saved',
      user: updatedUser,
    });
  } catch (err) {
    console.error('could not save notifications: ', err);
    return NextResponse.json(
      { message: 'Could not save notifications' },
      { status: 500 }
    );
  }
};
