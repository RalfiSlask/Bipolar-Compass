import { IMedication } from '@/app/types/medication';
import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export const POST = verifySignatureAppRouter(async (req: NextRequest) => {
  try {
    const { userId, medicationName, time, newMessageId } = await req.json();

    if (!userId || !medicationName || !time || !newMessageId) {
      return NextResponse.json(
        { error: 'Missing required webhook data' },
        { status: 400 }
      );
    }

    console.log('userId', userId);
    console.log('medicationName', medicationName);
    console.log('time', time);
    console.log('newMessageId', newMessageId);

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
