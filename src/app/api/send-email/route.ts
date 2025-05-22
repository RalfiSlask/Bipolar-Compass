import { sendMedicationNotificationEmail } from '@/app/utils/emailUtils';
import { Client } from '@upstash/qstash';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { formatInTimeZone } from 'date-fns-tz';
import { NextRequest, NextResponse } from 'next/server';

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

/**
 * This route is used to send an email to the user.
 * @param {NextRequest} req - The request object which contains the email, medication, time and userId.
 * @returns {NextResponse} Response object with success or error.
 */
export const POST = verifySignatureAppRouter(async function POST(
  req: NextRequest
) {
  const { email, medication, time, userId } = await req.json();

  try {
    // Send the email
    const medicationName = medication.name;

    await sendMedicationNotificationEmail({
      email,
      medication: medicationName,
      time,
    });

    // Calculate next medication time
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const nextMedicationTime = new Date(now);
    nextMedicationTime.setDate(nextMedicationTime.getDate() + 1);
    nextMedicationTime.setHours(hours, minutes, 0, 0);

    // Format the time in Swedish timezone
    const swedishTime = formatInTimeZone(
      nextMedicationTime,
      'Europe/Stockholm',
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
    );

    // Ensure next reminder is in the future
    const nextReminderTime = new Date(swedishTime);
    if (nextReminderTime.getTime() <= Date.now()) {
      nextReminderTime.setDate(nextReminderTime.getDate() + 1);
    }

    // Schedule next reminder
    const nextReminder = await qstashClient.publishJSON({
      url: `${process.env.NEXTAUTH_URL}/api/send-email`,
      body: { email, medication, userId, time },
      notBefore: Math.floor(nextReminderTime.getTime() / 1000),
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

    // Update webhook body with new messageId
    await qstashClient.publishJSON({
      url: `${process.env.NEXTAUTH_URL}/api/qstash-webhook`,
      body: {
        userId,
        medicationName: medication.name,
        time,
        newMessageId: nextReminder.messageId,
      },
    });

    return NextResponse.json({
      message: 'Email sent and next reminder scheduled',
      newMessageId: nextReminder.messageId,
    });
  } catch (error) {
    console.error('Failed to process reminder:', error);

    // Try to update the medication status even if scheduling fails
    await qstashClient.publishJSON({
      url: `${process.env.NEXTAUTH_URL}/api/qstash-webhook`,
      body: {
        userId,
        medicationName: medication.name,
        time,
        newMessageId: null, // Indicate that scheduling failed
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    return NextResponse.json(
      { error: 'Failed to process reminder' },
      { status: 500 }
    );
  }
});
