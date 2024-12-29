import { getCollection } from '@/app/utils/databaseUtils';
import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/app/utils/emailUtils';

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
    const user = await collection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'A user with this email address does not exist' },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { message: 'User is already verified', verified: true },
        { status: 200 }
      );
    }

    await sendVerificationEmail({
      verificationToken: user.verificationToken,
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
