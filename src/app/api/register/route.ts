import { MoodtrackerWeek } from '@/app/models/Moodtracker';
import { User } from '@/app/models/User';
import { sendVerificationEmail } from '@/app/utils/emailUtils';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '../../utils/databaseUtils';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { name, email, password } = await req.json();

    const usersCollection = await getCollection('thesis', 'users');
    const moodTrackerCollection = await getCollection(
      'thesis',
      'mood_tracker_weeks'
    );

    // Check if email already exists
    const emailAlreadyUsed = await usersCollection.findOne({ email });
    if (emailAlreadyUsed) {
      console.log('Email is already in use');
      return NextResponse.json(
        { error: 'E-posten är redan använd.' },
        { status: 400 }
      );
    }

    // Create new user
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(name, email, encryptedPassword);
    const serializedUser = newUser.toJSON();

    try {
      // Save user first
      const userResult = await usersCollection.insertOne(serializedUser);
      const userId = userResult.insertedId.toString();

      const initialMoodTracker = MoodtrackerWeek.createDefault(userId);
      await moodTrackerCollection.insertOne(initialMoodTracker);

      // Send verification email
      await sendVerificationEmail({
        verificationToken: newUser.verificationToken!,
        email: newUser.email,
      });

      return NextResponse.json(
        { message: 'User created, verification link sent' },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error during user creation:', error);

      return NextResponse.json(
        { error: 'Could not create user' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('An error occurred during user creation:', error);
    return NextResponse.json(
      { error: 'Error when creating user' },
      { status: 500 }
    );
  }
};
