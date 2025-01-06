import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { user_id, week, year } = await req.json();

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }


    const moodTrackerCollection = await getCollection(
      'thesis',
      'mood_tracker_weeks'
    );
    const query = {
      user_id,
      ...(week && year ? { week_number: week, year } : {}),
    };

    const moodTrackerData = await moodTrackerCollection
      .find(query)
      .sort({ created_at: -1 })
      .limit(1)
      .toArray();


    return NextResponse.json(moodTrackerData[0] || null);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
