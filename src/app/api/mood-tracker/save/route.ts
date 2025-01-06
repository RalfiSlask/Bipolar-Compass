import { IMoodTrackerWeek } from '@/app/types/moodtracker';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { user_id, weekData } = await req.json();

    const moodTrackerCollection = await getCollection(
      'thesis',
      'mood_tracker_weeks'
    );

    const existingEntry = await moodTrackerCollection.findOne({
      user_id,
      week_number: weekData.week_number,
      year: weekData.year,
    });

    const now = new Date().toISOString();

    if (existingEntry) {
      await moodTrackerCollection.updateOne(
        { _id: existingEntry._id },
        {
          $set: {
            mood_values: weekData.mood_values,
            updated_at: now,
          },
        }
      );
    } else {
      const newWeekData: IMoodTrackerWeek = {
        id: crypto.randomUUID(),
        user_id,
        week_number: weekData.week_number,
        year: weekData.year,
        created_at: now,
        updated_at: now,
        mood_values: weekData.mood_values,
      };

      await moodTrackerCollection.insertOne(newWeekData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
