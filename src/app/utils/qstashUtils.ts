import { Client } from '@upstash/qstash';
import { IMedication } from '../types/medication';

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export const scheduleMedicationReminder = async (
  userId: string,
  medication: IMedication,
  email: string
) => {
  if (!medication.reminder.enabled) {
    console.log(
      `Skipping reminder for ${medication.name} (reminders disabled).`
    );
    return;
  }

  if (medication.times.length === 0) {
    console.log(`Skipping reminder for ${medication.name} (no times set).`);
    return;
  }

  for (const time of medication.times) {
    console.log('Time:', time);
    const [hours, minutes] = time.split(':').map(Number);
    const medicationTime = new Date();
    medicationTime.setUTCHours(hours, minutes, 0, 0);

    if (medicationTime.getTime() <= Date.now()) {
      medicationTime.setUTCDate(medicationTime.getUTCDate() + 1);
    }

    try {
      await qstashClient.publishJSON({
        url: `${process.env.NEXTAUTH_URL}/api/send-email`,
        body: {
          email,
          medication,
          userId,
          time,
        },
        notBefore: Math.floor(medicationTime.getTime() / 1000),
      });
    } catch (error) {
      console.error(
        `Failed to schedule reminder for ${medication.name}:`,
        error
      );
    }
  }
};
