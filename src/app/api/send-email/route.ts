import { Client } from '@upstash/qstash';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Påminnelse: ${medication.name}`,
      text: `Dags att ta din medicin "${medication.name}" vid ${time}.`,
    });

    // Calculate next medication time
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const nextMedicationTime = new Date(now);

    if (
      now.getUTCHours() > hours ||
      (now.getUTCHours() === hours && now.getUTCMinutes() > minutes)
    ) {
      nextMedicationTime.setUTCDate(nextMedicationTime.getUTCDate() + 1);
    }

    nextMedicationTime.setUTCHours(hours, minutes, 0, 0);

    // Schedule the next reminder
    const nextReminder = await qstashClient.publishJSON({
      url: `${process.env.NEXTAUTH_URL}/api/send-email`,
      body: { email, medication, userId, time },
      notBefore: Math.floor(nextMedicationTime.getTime() / 1000),
    });

    // Trigger the webhook with the new messageId
    await qstashClient.publishJSON({
      url: `${process.env.NEXTAUTH_URL}/api/qstash-webhook`,
      body: {
        userId,
        medicationName: medication.name,
        newMessageId: nextReminder.messageId,
      },
    });

    return NextResponse.json({
      message: 'Email sent and next reminder scheduled',
      newMessageId: nextReminder.messageId,
    });
  } catch (error) {
    console.error('Failed to process reminder:', error);
    return NextResponse.json(
      { error: 'Failed to process reminder' },
      { status: 500 }
    );
  }
});
