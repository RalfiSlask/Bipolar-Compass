import { getCollection } from '@/app/utils/databaseUtils';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

/**
 * This route is used to delete the user's account.
 * @param {NextRequest} req - The request object which contains the email.
 * @returns {NextResponse} Response object with success or error.
 */
export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const usersCollection = await getCollection('thesis', 'users');
    const moodTrackerCollection = await getCollection(
      'thesis',
      'mood_tracker_weeks'
    );
    const diaryCollection = await getCollection('thesis', 'diaries');

    const { userId } = await req.json();
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user_id = user._id.toString();

    await moodTrackerCollection.deleteMany({ user_id: user_id });
    await diaryCollection.deleteMany({ user_id: user_id });
    await usersCollection.deleteOne({ _id: new ObjectId(userId) });

    return NextResponse.json({ message: 'User and associated data deleted' });
  } catch (err) {
    console.error('could not delete account:', err);
    return NextResponse.json(
      {
        message: 'could not delete account',
      },
      {
        status: 500,
      }
    );
  }
};
