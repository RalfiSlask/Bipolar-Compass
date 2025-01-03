import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const collection = await getCollection('thesis', 'users');
    const { values, originalEmail } = await req.json();
    const { email, age, gender } = values;

    const user = await collection.findOne({ email: originalEmail });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const updatedUser = {
      ...user,
      email: email,
      profile: {
        ...user.profile,
        age,
        gender,
      },
    };

    await collection.updateOne({ email: originalEmail }, { $set: updatedUser });

    return NextResponse.json({ message: 'Profile settings saved' });
  } catch (error) {
    console.error('Error saving settings: ', error);
    return NextResponse.json(
      { message: 'Error saving settings' },
      { status: 500 }
    );
  }
}
