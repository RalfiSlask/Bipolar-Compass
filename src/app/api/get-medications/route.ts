import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const collection = await getCollection('thesis', 'users');
    const user = await collection.findOne<IUser>({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { medications: user.profile.medications },
      { status: 200 }
    );
  } catch (error) {
    console.error('could not get medications: ', error);
    return NextResponse.json(
      { error: 'could not get medications' },
      { status: 500 }
    );
  }
};
