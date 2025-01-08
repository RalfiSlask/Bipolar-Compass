import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { user_id } = await req.json();
    console.log('Received user_id:', user_id);

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
    };

    const moodTrackerData = await moodTrackerCollection.find(query).toArray();
    return NextResponse.json(moodTrackerData);
  } catch (err) {
    console.error('Error fetching mood tracker data:', err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
