import { IMedication } from '@/app/types/medication';
import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

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
