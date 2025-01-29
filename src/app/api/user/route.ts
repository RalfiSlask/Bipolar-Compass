import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * This route is used to get the user's data.
 * @param {NextRequest} req - The request object which contains the email.
 * @returns {NextResponse} Response object with the user's data or error.
 */
export const POST = async (req: NextRequest) => {
  try {
    const collection = await getCollection('thesis', 'users');

    const { email } = await req.json();
    const user = await collection.findOne({
      email,
    });

    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userWithOutPassword = {
      ...user,
      password: undefined,
    };

    const moodTrackerCollection = await getCollection(
      'thesis',
      'mood_tracker_weeks'
    );

    // Get the mood tracker data for the user and add it to the user's data
    const moodTrackerData = await moodTrackerCollection
      .find({
        user_id: user._id.toString(),
      })

      .toArray();

    const responseData = {
      ...userWithOutPassword,
      moodTrackerData,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
};
