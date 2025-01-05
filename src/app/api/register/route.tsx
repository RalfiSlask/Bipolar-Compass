import { User } from '@/app/models/User';
import { sendVerificationEmail } from '@/app/utils/emailUtils';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '../../utils/databaseUtils';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const collection = await getCollection('thesis', 'users');
    const { name, email, password } = await req.json();

    // We check if email already exists
    const emailAlreadyUsed = await collection.findOne({ email });
    if (emailAlreadyUsed) {
      console.log('Email is already in use');
      return NextResponse.json(
        { error: 'E-posten är redan använd.' },
        { status: 400 }
      );
    }

    // We create the new user
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(name, email, encryptedPassword);
    const serializedUser = newUser.toJSON();

    try {
      await sendVerificationEmail({
        verificationToken: newUser.verificationToken!,
        email: newUser.email,
      });
    } catch (error) {
      console.error('Verification email could not be sent:', error);
      return NextResponse.json(
        { error: 'Could not send verification email' },
        { status: 500 }
      );
    }

    try {
      const insertResult = await collection.insertOne(serializedUser);
      console.log('User successfully inserted into database:', insertResult);
    } catch (error) {
      console.error('Error inserting user into database:', error);
      return NextResponse.json(
        { error: 'Could not insert user into database' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'User created, verification link sent' },
      { status: 201 }
    );
  } catch (error) {
    console.error('An error occurred during user creation:', error);
    return NextResponse.json(
      { error: 'Error when creating user' },
      { status: 500 }
    );
  }
};
