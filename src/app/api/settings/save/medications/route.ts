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

    // Schedule qstash reminders for the medications
    const updatedMedications = await Promise.all(
      medications.map(async (medication: IMedication) => {
        if (medication.reminder.enabled) {
          try {
            // Check if we need to schedule new reminders
            const existingSchedules = medication.reminder.schedule || [];
            const scheduledTimes = existingSchedules.map((s) => s.time);
            const timesNeedingScheduling = medication.reminder.times.filter(
              (time) => !scheduledTimes.includes(time)
            );

            if (timesNeedingScheduling.length > 0) {
              const newSchedules = await scheduleMedicationReminder(
                user._id?.toString() || '',
                {
                  ...medication,
                  reminder: {
                    ...medication.reminder,
                    times: timesNeedingScheduling,
                  },
                },
                email
              );

              return {
                ...medication,
                reminder: {
                  ...medication.reminder,
                  schedule: [...existingSchedules, ...newSchedules],
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
