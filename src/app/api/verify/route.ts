import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Verification token is missing' },
      { status: 400 }
    );
  }

  try {
    const collection = await getCollection('thesis', 'users');

    const user = (await collection.findOne({
      verificationToken: token,
    })) as IUser | null;

    if (!user) {
      const verifiedUser = await collection.findOne({ isVerified: true });

      if (verifiedUser) {
        return NextResponse.json(
          {
            message: 'User is already verified',
            verified: true,
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    if (!user.tokenExpires) {
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
    }

    if (user.isVerified) {
      return NextResponse.json(
        {
          message: 'User is already verified',
          verified: true,
        },
        { status: 200 }
      );
    }

    if (new Date() > new Date(user.tokenExpires)) {
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
    }

    await collection.updateOne(
      { verificationToken: token },
      {
        $set: { isVerified: true },
        $unset: { verificationToken: '', tokenExpires: '' },
      }
    );

    return NextResponse.json(
      { message: 'E-mail address has been verified', email: user.email },
      { status: 200 }
    );
  } catch (err) {
    console.error('Could not verify user: ', err);
    return NextResponse.json(
      { error: 'Server error during verification process' },
      { status: 500 }
    );
  }
};
