import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * This route is used to get a diary entry.
 * @param {NextRequest} req - The request object which contains the user_id.
 * @returns {NextResponse} Response object with the diary entry or error.
 */
export const POST = async (req: NextRequest) => {
  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const diaryCollection = await getCollection('thesis', 'diaries');

    const diary = await diaryCollection.findOne({ user_id });

    return NextResponse.json(diary);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
