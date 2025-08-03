import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/get-medications:
 *   post:
 *     summary: Get user medications
 *     description: Retrieves all medications associated with a user's profile. Returns the complete medication list including dosages, schedules, and reminder settings.
 *     tags:
 *       - Medications
 *       - User Profile
 *       - Healthcare
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user whose medications to retrieve
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: User medications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 medications:
 *                   type: array
 *                   description: Array of user's medications
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the medication
 *                         example: "Sertraline"
 *                       dosage:
 *                         type: string
 *                         description: Dosage information
 *                         example: "50mg"
 *                       frequency:
 *                         type: string
 *                         description: How often the medication should be taken
 *                         example: "Once daily"
 *                       instructions:
 *                         type: string
 *                         description: Special instructions for taking the medication
 *                         example: "Take with food"
 *                       start_date:
 *                         type: string
 *                         format: date
 *                         description: When the medication was started
 *                         example: "2024-01-01"
 *                       end_date:
 *                         type: string
 *                         format: date
 *                         description: When the medication should be stopped (optional)
 *                         example: "2024-12-31"
 *                       prescribed_by:
 *                         type: string
 *                         description: Name of the prescribing doctor
 *                         example: "Dr. Anna Andersson"
 *                       pharmacy:
 *                         type: string
 *                         description: Pharmacy where medication is obtained
 *                         example: "Apoteket Hjärtat"
 *                       reminder:
 *                         type: object
 *                         description: Reminder settings for the medication
 *                         properties:
 *                           enabled:
 *                             type: boolean
 *                             description: Whether reminders are enabled
 *                             example: true
 *                           schedule:
 *                             type: array
 *                             description: Scheduled reminder times
 *                             items:
 *                               type: object
 *                               properties:
 *                                 time:
 *                                   type: string
 *                                   description: Time for reminder (HH:MM format)
 *                                   example: "08:00"
 *                                 messageId:
 *                                   type: string
 *                                   description: QStash message ID for the reminder
 *                                   example: "msg_123456789"
 *                                 status:
 *                                   type: string
 *                                   enum: [pending, sent, cancelled]
 *                                   description: Status of the reminder
 *                                   example: "pending"
 *                           history:
 *                             type: array
 *                             description: History of sent reminders
 *                             items:
 *                               type: object
 *                               properties:
 *                                 time:
 *                                   type: string
 *                                   description: Time the reminder was sent
 *                                   example: "08:00"
 *                                 sentAt:
 *                                   type: string
 *                                   format: date-time
 *                                   description: When the reminder was sent
 *                                   example: "2024-01-15T08:00:00Z"
 *                                 messageId:
 *                                   type: string
 *                                   description: QStash message ID
 *                                   example: "msg_123456789"
 *                                 status:
 *                                   type: string
 *                                   enum: [sent, cancelled]
 *                                   description: Status of the reminder
 *                                   example: "sent"
 *                       side_effects:
 *                         type: array
 *                         description: Known side effects
 *                         items:
 *                           type: string
 *                         example: ["nausea", "headache", "drowsiness"]
 *                       notes:
 *                         type: string
 *                         description: Additional notes about the medication
 *                         example: "Take in the morning to avoid sleep issues"
 *       400:
 *         description: Bad request - email is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email is required"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "could not get medications"
 *     security: []
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/get-medications', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               email: 'user@example.com'
 *             })
 *           });
 *           const data = await response.json();
 *       - lang: cURL
 *         source: |
 *           curl -X POST /api/get-medications \
 *             -H "Content-Type: application/json" \
 *             -d '{"email": "user@example.com"}'
 */

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const collection = await getCollection('thesis', 'users');
    const user = await collection.findOne<IUser>({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { medications: user.profile.medications },
      { status: 200 }
    );
  } catch (error) {
    console.error('could not get medications: ', error);
    return NextResponse.json(
      { error: 'could not get medications' },
      { status: 500 }
    );
  }
};
