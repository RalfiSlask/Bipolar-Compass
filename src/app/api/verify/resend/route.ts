import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { sendVerificationEmail } from '@/app/utils/emailUtils';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

/**
 * This route is used to resend the verification email.
 * @param {Request} req - The request object which contains the email.
 * @returns {NextResponse} Response object with success or error.
 */

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required to send a verification link' },
        { status: 400 }
      );
    }

    const collection = await getCollection('thesis', 'users');
    const user = (await collection.findOne({ email })) as IUser | null;

    // Generate a new verification token if the user does not have one
    const newVerificationToken = crypto.randomBytes(32).toString('hex');
    const newTokenExpires = new Date(Date.now() + 3600 * 1000);

    await collection.updateOne(
      { email },
      {
        $set: {
          verificationToken: newVerificationToken,
          tokenExpires: newTokenExpires,
        },
      }
    );

    if (!user) {
      console.log('user does not exist');
      return NextResponse.json(
        { error: 'A user with this email address does not exist' },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      console.log('user is already verified');
      return NextResponse.json(
        { message: 'User is already verified', verified: true },
        { status: 200 }
      );
    }

    await sendVerificationEmail({
      verificationToken: newVerificationToken,
      email: user.email,
    });

    return NextResponse.json(
      { message: 'The verification link has been resent!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resending verification email:', error);
    return NextResponse.json(
      { error: 'Failed to resend the verification link' },
      { status: 500 }
    );
  }
};
