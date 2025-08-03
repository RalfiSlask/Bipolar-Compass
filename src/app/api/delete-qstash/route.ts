import { IMedication } from '@/app/types/medication';
import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { Client } from '@upstash/qstash';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

/**
 * @swagger
 * /api/delete-qstash:
 *   post:
 *     summary: Delete QStash messages and update medication schedules
 *     description: Deletes scheduled QStash messages from Upstash and updates the user's medication schedule accordingly. Cancelled schedules are moved to history with 'cancelled' status.
 *     tags:
 *       - Medication
 *       - QStash
 *       - Scheduling
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messageIds
 *               - userId
 *               - medicationName
 *             properties:
 *               messageIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of QStash message IDs to delete
 *                 example: ["msg_123456789", "msg_987654321"]
 *               userId:
 *                 type: string
 *                 description: The unique identifier of the user
 *                 example: "507f1f77bcf86cd799439011"
 *               medicationName:
 *                 type: string
 *                 description: The name of the medication whose schedules are being cancelled
 *                 example: "Sertraline"
 *     responses:
 *       200:
 *         description: Messages deleted successfully and medication schedule updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                   example: true
 *                 results:
 *                   type: array
 *                   description: Results of the QStash message deletion operations
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The message ID that was processed
 *                       status:
 *                         type: string
 *                         enum: [success, error]
 *                         description: The status of the deletion operation
 *                       error:
 *                         type: string
 *                         description: Error message if deletion failed
 *                 updatedMedications:
 *                   type: array
 *                   description: Updated medication list with cancelled schedules moved to history
 *                   items:
 *                     $ref: '#/components/schemas/Medication'
 *       400:
 *         description: Bad request - missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required parameters"
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
 *                   example: "Failed to delete messages"
 *     security: []
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/delete-qstash', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               messageIds: ['msg_123456789', 'msg_987654321'],
 *               userId: '507f1f77bcf86cd799439011',
 *               medicationName: 'Sertraline'
 *             })
 *           });
 *           const data = await response.json();
 *       - lang: cURL
 *         source: |
 *           curl -X POST /api/delete-qstash \
 *             -H "Content-Type: application/json" \
 *             -d '{
 *               "messageIds": ["msg_123456789", "msg_987654321"],
 *               "userId": "507f1f77bcf86cd799439011",
 *               "medicationName": "Sertraline"
 *             }'
 */

/**
 * This route is used to delete QStash messages on upstash qstash that is connected to vercel.
 * @param {NextRequest} req - The request object which contains the messageId to delete.
 * @returns {NextResponse} Response object with success or error.
 */
export const POST = async (req: NextRequest) => {
  try {
    const { messageIds, userId, medicationName } = await req.json();

    if (!messageIds || !userId || !medicationName) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const collection = await getCollection('thesis', 'users');
    const user = await collection.findOne<IUser>({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Delete messages from QStash
    const deletePromises = messageIds.map(async (id: string) => {
      try {
        await qstashClient.messages.delete(id);
        return { id, status: 'success' };
      } catch (error) {
        console.error(`Failed to delete message ${id}:`, error);
        return { id, status: 'error', error };
      }
    });

    console.log('deletePromises', deletePromises);

    const results = await Promise.allSettled(deletePromises);

    console.log('results', results);

    // Update medication schedule and history
    const updatedMedications = user.profile.medications.map(
      (med: IMedication) => {
        if (med.name === medicationName) {
          // Find all schedules that need to be cancelled
          const cancelledSchedules = med.reminder.schedule.filter(
            (s) => messageIds.includes(s.messageId) && s.status === 'pending'
          );

          // Move cancelled schedules to history
          const newHistory = [
            ...med.reminder.history,
            ...cancelledSchedules.map((s) => ({
              time: s.time,
              sentAt: new Date().toISOString(),
              messageId: s.messageId,
              status: 'cancelled',
            })),
          ];

          // Remove cancelled schedules
          const newSchedule = med.reminder.schedule.filter(
            (s) => !messageIds.includes(s.messageId)
          );

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

    // Update database
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { 'profile.medications': updatedMedications } }
    );

    return NextResponse.json({
      success: true,
      results,
      updatedMedications,
    });
  } catch (error) {
    console.error('Failed to delete QStash messages:', error);
    return NextResponse.json(
      { error: 'Failed to delete messages' },
      { status: 500 }
    );
  }
};
