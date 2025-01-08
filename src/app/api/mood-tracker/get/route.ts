import { MoodtrackerWeek } from '@/app/models/Moodtracker';
import { IMoodTrackerWeek } from '@/app/types/moodtracker';
import { getCollection } from '@/app/utils/databaseUtils';
import { Document, WithId } from 'mongodb';
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

    if (moodTrackerData[0]) {
      const mongoDoc = moodTrackerData[0] as WithId<Document>;
      const weekData: IMoodTrackerWeek = {
        id: mongoDoc._id.toString(),
        user_id: mongoDoc.user_id,
        week_number: mongoDoc.week_number,
        year: mongoDoc.year,
        created_at: mongoDoc.created_at,
        updated_at: mongoDoc.updated_at,
        mood_values: mongoDoc.mood_values,
      };

      return NextResponse.json(new MoodtrackerWeek(weekData));
    }

    return NextResponse.json(null);
  } catch (err) {
    console.error('Error fetching mood tracker data:', err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
