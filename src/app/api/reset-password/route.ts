import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
export const POST = async (req: NextRequest) => {
  try {
    const { password, token } = await req.json();

    const collection = await getCollection('thesis', 'users');
    const user = (await collection.findOne({
      resetTokenExpires: { $gt: Date.now() },
    })) as IUser | null;

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }
    if (!user.resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    const isTokenValid = await bcryptjs.compare(token, user.resetToken);
    if (!isTokenValid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    await collection.updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: '', resetTokenExpires: '' },
      }
    );

    return NextResponse.json(
      { message: 'Password reset successful' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error resetting password:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
