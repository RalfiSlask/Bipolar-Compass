import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const { currentPassword, newPassword, email } = await req.json();

    const collection = await getCollection('thesis', 'users');

    const user = (await collection.findOne({ email })) as IUser | null;

    if (!user) {
      return NextResponse.json(
        { message: 'Användaren hittades inte' },
        { status: 404 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { message: 'Användaren har ingen lösenord' },
        { status: 400 }
      );
    }

    const isValidPassword = await bcryptjs.compare(
      currentPassword,
      user.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Felaktigt nuvarande lösenord' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 12);

    await collection.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return NextResponse.json(
      { message: 'Lösenordet har uppdaterats' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password update error:', error);
    return NextResponse.json(
      { message: 'Ett fel uppstod vid uppdatering av lösenord' },
      { status: 500 }
    );
  }
}
