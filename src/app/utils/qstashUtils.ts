import { Client } from '@upstash/qstash';
import { IMedication } from '../types/medication';

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
): Promise<string | null> => {
  if (!medication.reminder.enabled || medication.times.length === 0) {
    console.log(`Skipping reminder for ${medication.name}`);
    return null;
  }

  let messageId: string | null = null;

  for (const time of medication.times) {
    const medicationTime = convertSwedishTimeToUTC(time);
    if (medicationTime.getTime() <= Date.now()) {
      medicationTime.setUTCDate(medicationTime.getUTCDate() + 1);
    }

    try {
      // Schedule the next reminder
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
          newMessageId: null, // This will be set in send-email route
        },
      });

      console.log('response', response);

      messageId = response.messageId;
      console.log(
        `Initial reminder scheduled for ${medication.name} - QStash Message ID: ${messageId}`
      );
    } catch (error) {
      console.error(
        `Failed to schedule reminder for ${medication.name}:`,
        error
      );
    }
  }

  return messageId;
};
