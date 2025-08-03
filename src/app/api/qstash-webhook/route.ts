import { IMedication } from '@/app/types/medication';
import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/qstash-webhook:
 *   post:
 *     summary: Process QStash webhook for medication reminders
 *     description: Webhook endpoint that processes medication reminder notifications from QStash. Updates medication status, moves completed reminders to history, and schedules the next reminder for the following day.
 *     tags:
 *       - Webhooks
 *       - Medications
 *       - QStash
 *       - Scheduling
 *     security:
 *       - qstashSignature: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - medicationName
 *               - time
 *               - newMessageId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The unique identifier of the user
 *                 example: "507f1f77bcf86cd799439011"
 *               medicationName:
 *                 type: string
 *                 description: Name of the medication for which the reminder was sent
 *                 example: "Sertraline"
 *               time:
 *                 type: string
 *                 pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
 *                 description: Time of the reminder in HH:MM format
 *                 example: "08:00"
 *               newMessageId:
 *                 type: string
 *                 description: QStash message ID for the next scheduled reminder
 *                 example: "msg_987654321"
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message confirming webhook processing
 *                   example: "Webhook processed successfully"
 *                 updatedMedications:
 *                   type: array
 *                   description: Updated medication list with new schedule and history
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the medication
 *                         example: "Sertraline"
 *                       reminder:
 *                         type: object
 *                         description: Updated reminder settings
 *                         properties:
 *                           schedule:
 *                             type: array
 *                             description: Updated schedule with next reminder
 *                             items:
 *                               type: object
 *                               properties:
 *                                 time:
 *                                   type: string
 *                                   description: Time for reminder
 *                                   example: "08:00"
 *                                 nextReminder:
 *                                   type: string
 *                                   format: date-time
 *                                   description: When the next reminder is scheduled
 *                                   example: "2024-01-16T08:00:00Z"
 *                                 messageId:
 *                                   type: string
 *                                   description: QStash message ID for the reminder
 *                                   example: "msg_987654321"
 *                                 status:
 *                                   type: string
 *                                   enum: [pending, sent, cancelled]
 *                                   description: Status of the reminder
 *                                   example: "pending"
 *                           history:
 *                             type: array
 *                             description: Updated history with sent reminder
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
 *       400:
 *         description: Bad request - missing required webhook data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required webhook data"
 *       401:
 *         description: Unauthorized - invalid QStash signature
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid signature"
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
 *                   example: "Could not process webhook"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           // This endpoint is called by QStash automatically
 *           // Example of webhook payload:
 *           const webhookData = {
 *             userId: '507f1f77bcf86cd799439011',
 *             medicationName: 'Sertraline',
 *             time: '08:00',
 *             newMessageId: 'msg_987654321'
 *           };
 *       - lang: cURL
 *         source: |
 *           # This endpoint is called by QStash automatically
 *           # Example webhook call:
 *           curl -X POST /api/qstash-webhook \
 *             -H "Content-Type: application/json" \
 *             -H "upstash-signature: ..." \
 *             -d '{
 *               "userId": "507f1f77bcf86cd799439011",
 *               "medicationName": "Sertraline",
 *               "time": "08:00",
 *               "newMessageId": "msg_987654321"
 *             }'
 */

/**
 * This route is used to update the medication status and schedule the next reminder.
 * @param {NextRequest} req - The request object which contains the userId, medicationName, time and newMessageId.
 * @returns {NextResponse} Response object with success or error.
 */
export const POST = verifySignatureAppRouter(async (req: NextRequest) => {
  try {
    const { userId, medicationName, time, newMessageId } = await req.json();

    if (!userId || !medicationName || !time || !newMessageId) {
      return NextResponse.json(
        { error: 'Missing required webhook data' },
        { status: 400 }
      );
    }

    const collection = await getCollection('thesis', 'users');
    const user = await collection.findOne<IUser>({
      _id: new ObjectId(userId),
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedMedications = user.profile.medications.map(
      (med: IMedication) => {
        if (med.name === medicationName) {
          // Find the specific schedule for this time
          const oldSchedule = med.reminder.schedule.find(
            (s) => s.time === time && s.status === 'pending'
          );

          // Move completed schedule to history with proper status
          const newHistory = oldSchedule
            ? [
                ...med.reminder.history,
                {
                  time: oldSchedule.time,
                  sentAt: new Date().toISOString(),
                  messageId: oldSchedule.messageId,
                  status: 'sent',
                },
              ]
            : med.reminder.history;

          // Update schedule with new reminder for the same time

          const [hours, minutes] = time.split(':').map(Number);

          const nextReminderTime = new Date();
          nextReminderTime.setUTCDate(nextReminderTime.getUTCDate() + 1);
          nextReminderTime.setUTCHours(hours, minutes, 0, 0);

          const newSchedule = [
            ...med.reminder.schedule.filter(
              (s) => s.messageId !== oldSchedule?.messageId
            ),
            {
              time,
              nextReminder: new Date().toISOString(),
              messageId: newMessageId,
              status: 'pending',
            },
          ];

          return {
            ...med,
            reminder: {
              ...med.reminder,
              schedule: newSchedule,
              history: newHistory,
            },
          };
        }
        return med;
      }
    );

    console.log('updatedMedications', updatedMedications);

    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { 'profile.medications': updatedMedications } }
    );

    return NextResponse.json({
      message: 'Webhook processed successfully',
      updatedMedications,
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Could not process webhook' },
      { status: 500 }
    );
  }
});
