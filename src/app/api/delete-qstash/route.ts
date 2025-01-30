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
