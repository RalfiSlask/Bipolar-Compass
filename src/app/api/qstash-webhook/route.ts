import { IMedication } from '@/app/types/medication';
import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const handler = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Extract data from the webhook body
    const { userId, medicationName, newMessageId, replaceExisting } = body;

    if (!userId || !medicationName || !newMessageId) {
      return NextResponse.json(
        { error: 'Missing required webhook data' },
        { status: 400 }
      );
    }

    const collection = await getCollection('thesis', 'users');
    const user = await collection.findOne<IUser>({
      _id: new ObjectId(userId),
    });

    console.log('user', user);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update the medication's messageIds
    const updatedMedications = user.profile.medications.map(
      (med: IMedication) => {
        if (med.name === medicationName) {
          return {
            ...med,
            reminder: {
              ...med.reminder,
              messageIds: replaceExisting
                ? [newMessageId] // Replace existing messageIds
                : [...(med.reminder.messageIds || []), newMessageId], // Append
            },
          };
        }
        return med;
      }
    );

    console.log('updatedMedications', updatedMedications);

    // Update the user's medications in the database
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
};

export const POST = verifySignatureAppRouter(handler);
