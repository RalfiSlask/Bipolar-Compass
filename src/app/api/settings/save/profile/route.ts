import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const collection = await getCollection('thesis', 'users');
    const { values, originalEmail } = await req.json();
    const { email, age, gender } = values;

    console.log('API Route - Received data:', {
      originalEmail,
      newEmail: email,
      age,
      gender,
    });

    if (email !== originalEmail) {
      console.log(
        'API Route - Email change detected, checking for duplicates...'
      );
      const existingUser = await collection.findOne({ email: email });
      if (existingUser) {
        console.log('API Route - Duplicate email found:', email);
        return NextResponse.json(
          { message: 'Email already exists' },
          { status: 400 }
        );
      }
      console.log(
        'API Route - No duplicate email found, proceeding with update'
      );
    }

    console.log('API Route - Updating user...', {
      findBy: { email: originalEmail },
      updateWith: {
        email,
        'profile.age': age,
        'profile.gender': gender,
      },
    });

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
    console.log('API Route - User after update:', updatedUser);

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
