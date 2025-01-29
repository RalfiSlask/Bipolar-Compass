import { Client } from '@upstash/qstash';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export const POST = verifySignatureAppRouter(async function POST(
  req: NextRequest
) {
  const { email, medication, time, userId } = await req.json();

  try {
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

    await qstashClient.publishJSON({
      url: `${process.env.NEXTAUTH_URL}/api/send-email`,
      body: { email, medication, userId, time },
      notBefore: Math.floor(nextMedicationTime.getTime() / 1000),
    });

    return NextResponse.json({
      message: 'Email sent and next reminder scheduled',
    });
  } catch (error) {
    console.error('Failed to process reminder:', error);
    return NextResponse.json(
      { error: 'Failed to process reminder' },
      { status: 500 }
    );
  }
});
