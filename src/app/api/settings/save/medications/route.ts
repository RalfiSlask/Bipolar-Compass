import { IMedication } from '@/app/types/medication';
import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { scheduleMedicationReminder } from '@/app/utils/qstashUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * This route is used to save the user's medications.
 * @param {NextRequest} req - The request object which contains the medications and email.
 * @returns {NextResponse} Response object with success or error.
 */
export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { medications, email } = await req.json();
    const collection = await getCollection('thesis', 'users');
    const user = (await collection.findOne({ email })) as IUser | null;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    console.log('medications', medications);

    // Schedule qstash reminders for the medications to send emails to the user
    const updatedMedications = await Promise.all(
      medications.map(async (medication: IMedication) => {
        if (medication.reminder.enabled) {
          try {
            // Only schedule a new reminder if there are no existing messageIds
            if (!medication.reminder.messageIds?.length) {
              const messageId = await scheduleMedicationReminder(
                user._id?.toString() || '',
                medication,
                email
              );

              return {
                ...medication,
                reminder: {
                  ...medication.reminder,
                  messageIds: [messageId],
                },
              };
            }
          } catch (error) {
            console.error(
              `Failed to schedule reminder for ${medication.name}:`,
              error
            );
          }
        }
        return medication;
      })
    );

    const updatedUser = {
      ...user,
      profile: { ...user.profile, medications: updatedMedications },
    };
    await collection.updateOne({ email }, { $set: updatedUser });

    return NextResponse.json({
      message: 'Medicines saved',
      medications: updatedMedications,
    });
  } catch (err) {
    console.error('could not save medications: ', err);
    return NextResponse.json(
      { error: 'could not save medications' },
      { status: 500 }
    );
  }
};
