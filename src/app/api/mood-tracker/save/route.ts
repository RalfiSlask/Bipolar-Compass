import { MoodtrackerWeek } from '@/app/models/Moodtracker';
import {
  IMoodTrackerDocument,
  IMoodTrackerWeek,
} from '@/app/types/moodtracker';
import { getCollection } from '@/app/utils/databaseUtils';
import { ObjectId, WithId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

/**
 * This route is used to save the mood tracker data by week.
 * @param {NextRequest} req - The request object which contains the user_id and weekData.
 * @returns {NextResponse} Response object with success or error.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { user_id, weekData } = await req.json();

    const moodTrackerCollection = await getCollection(
      'thesis',
      'mood_tracker_weeks'
    );

    const existingEntry = (await moodTrackerCollection.findOne({
      user_id,
      week_number: weekData.week_number,
      year: weekData.year,
    })) as IMoodTrackerDocument | null;

    const now = new Date().toISOString();

    if (existingEntry) {
      const updatedWeekData: IMoodTrackerWeek = {
        id: existingEntry._id.toString(),
        user_id: existingEntry.user_id,
        week_number: existingEntry.week_number,
        year: existingEntry.year,
        created_at: existingEntry.created_at,
        updated_at: now,
        mood_values: weekData.mood_values,
      };

      const updatedWeek = new MoodtrackerWeek(updatedWeekData);

      await moodTrackerCollection.updateOne(
        { _id: existingEntry._id },
        { $set: updatedWeek }
      );
    } else {
      const newWeekData: WithId<IMoodTrackerWeek> = {
        _id: new ObjectId(),
        id: crypto.randomUUID(),
        user_id,
        week_number: weekData.week_number,
        year: weekData.year,
        created_at: now,
        updated_at: now,
        mood_values: weekData.mood_values,
      };

      const newWeek = new MoodtrackerWeek(newWeekData);
      await moodTrackerCollection.insertOne(
        JSON.parse(JSON.stringify(newWeek))
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
