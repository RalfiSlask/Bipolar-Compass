import { Client } from '@upstash/qstash';
import { IMedication } from '../types/medication';

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

const convertSwedishTimeToUTC = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);

  const swedishTime = new Date();
  swedishTime.setHours(hours, minutes, 0, 0);

  return new Date(swedishTime.toISOString());
};

export const scheduleMedicationReminder = async (
  userId: string,
  medication: IMedication,
  email: string
): Promise<string | null> => {
  if (!medication.reminder.enabled) {
    console.log(
      `Skipping reminder for ${medication.name} (reminders disabled).`
    );
    return null;
  }

  if (medication.times.length === 0) {
    console.log(`Skipping reminder for ${medication.name} (no times set).`);
    return null;
  }

  console.log('medication', medication);

  let messageId: string | null = null;

  for (const time of medication.times) {
    console.log('time', time);
    const medicationTime = convertSwedishTimeToUTC(time);
    console.log('medicationTime', medicationTime);

    if (medicationTime.getTime() <= Date.now()) {
      medicationTime.setUTCDate(medicationTime.getUTCDate() + 1);
    }

    console.log('medicationTime', medicationTime);

    console.log(process.env.NEXTAUTH_URL);

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
      });

      console.log('response', response);

      messageId = response.messageId;
      console.log(
        `Reminder scheduled for ${medication.name} - QStash Message ID: ${messageId}`
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
