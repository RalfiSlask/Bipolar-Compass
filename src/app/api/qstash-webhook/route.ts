import { IMedication } from '@/app/types/medication';
import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const handler = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { messageId, metadata } = body;
    if (!metadata || !metadata.userId || !metadata.medicationName) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
    }

    const { userId, medicationName } = metadata;

    console.log('userId', userId, 'medicationName');

    if (typeof userId !== 'string') {
      throw new Error('Invalid userId: Must be a string');
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
          return {
            ...med,
            reminder: {
              ...med.reminder,
              messageIds: [...(med.reminder.messageIds || []), messageId],
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

    return NextResponse.json({ message: 'Message ID updated successfully' });
  } catch (error) {
    console.error('Error updating message ID:', error);
    return NextResponse.json(
      { error: 'Could not update message ID' },
      { status: 500 }
    );
  }
};

// ✅ **Wrappar route-handlern med `verifySignatureAppRouter`**
export const POST = verifySignatureAppRouter(handler);
