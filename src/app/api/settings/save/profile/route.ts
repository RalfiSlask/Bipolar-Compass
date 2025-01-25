import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const collection = await getCollection('thesis', 'users');
    const { values, originalEmail } = await req.json();
    const { email, age, gender } = values;

    if (email !== originalEmail) {
      const existingUser = await collection.findOne({ email: email });
      if (existingUser) {
        console.log('API Route - Duplicate email found:', email);
        return NextResponse.json(
          { message: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    await collection.updateOne(
      { email: originalEmail },
      {
        $set: {
          email: email,
          'profile.age': age,
          'profile.gender': gender,
        },
      }
    );

    const updatedUser = await collection.findOne({ email: email });

    if (!updatedUser) {
      console.log('API Route - Updated user not found!');
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Profile settings saved',
      user: updatedUser,
    });
  } catch (error) {
    console.error('API Route - Error saving settings:', error);
    return NextResponse.json(
      { message: 'Error saving settings' },
      { status: 500 }
    );
  }
}
