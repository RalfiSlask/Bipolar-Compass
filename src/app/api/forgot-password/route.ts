import { getCollection } from '@/app/utils/databaseUtils';
import { sendForgotPasswordEmail } from '@/app/utils/emailUtils';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

/**
 * This route is used to send a forgot password link to the user.
 * @param {NextRequest} req - The request object which contains the email.
 * @returns {NextResponse} Response object with success or error.
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required to send a forgot password link' },
        { status: 400 }
      );
    }

    const collection = await getCollection('thesis', 'users');
    const user = await collection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'A user with this email address does not exist' },
        { status: 404 }
      );
    }

    // Generate a random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash the reset token
    const hashedToken = bcrypt.hashSync(resetToken, 10);

    await collection.updateOne(
      { email },
      {
        $set: {
          resetToken: hashedToken,
          resetTokenExpires: Date.now() + 3600000,
        },
      }
    );

    await sendForgotPasswordEmail({ email, resetToken });

    return NextResponse.json({ message: 'Email sent' }, { status: 200 });
  } catch (err) {
    console.error('Error sending forgot password email:', err);
    return NextResponse.json(
      { error: 'Failed to send forgot password email' },
      { status: 500 }
    );
  }
}
