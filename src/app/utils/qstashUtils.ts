import { Client } from '@upstash/qstash';
import { IMedication, ISchedule } from '../types/medication';

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

const convertSwedishTimeToUTC = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const swedishTime = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      hours - 1,
      minutes,
      0
    )
  );

  return swedishTime;
};

export const scheduleMedicationReminder = async (
  userId: string,
  medication: IMedication,
  email: string
): Promise<ISchedule[]> => {
  console.log('scheduling reminder');
  if (!medication.reminder.enabled || medication.reminder.times.length === 0) {
    console.log(`Skipping reminder for ${medication.name}`);
    return [];
  }

  const schedules: ISchedule[] = [];

  for (const time of medication.reminder.times) {
    const medicationTime = convertSwedishTimeToUTC(time);
    if (medicationTime.getTime() <= Date.now()) {
      medicationTime.setUTCDate(medicationTime.getUTCDate() + 1);
    }

    try {
      const response = await qstashClient.publishJSON({
        url: `${process.env.NEXTAUTH_URL}/api/send-email`,
        body: {
          email,
          medication,
          userId,
          time,
        },
        notBefore: Math.floor(medicationTime.getTime() / 1000),
        webhook: `${process.env.NEXTAUTH_URL}/api/qstash-webhook`,
        webhookHeaders: {
          'Content-Type': 'application/json',
        },
        webhookBody: {
          userId,
          medicationName: medication.name,
          time,
          newMessageId: null,
        },
      });

      schedules.push({
        time,
        nextReminder: medicationTime.toISOString(),
        messageId: response.messageId,
        status: 'pending',
      });
    } catch (error) {
      console.error(
        `Failed to schedule reminder for ${medication.name} at ${time}:`,
        error
      );
    }
  }

  return schedules;
};
