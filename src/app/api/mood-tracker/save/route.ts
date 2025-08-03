import { MoodtrackerWeek } from '@/app/models/Moodtracker';
import {
  IMoodTrackerDocument,
  IMoodTrackerWeek,
} from '@/app/types/moodtracker';
import { getCollection } from '@/app/utils/databaseUtils';
import { ObjectId, WithId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/mood-tracker/save:
 *   post:
 *     summary: Spara mood tracker-data
 *     description: Sparar eller uppdaterar mood tracker-data för en specifik vecka
 *     tags:
 *       - Mood Tracker
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - weekData
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: Användarens ID
 *                 example: "user123"
 *               weekData:
 *                 type: object
 *                 required:
 *                   - week_number
 *                   - year
 *                   - mood_values
 *                 properties:
 *                   week_number:
 *                     type: number
 *                     description: Veckonummer (1-52)
 *                     example: 3
 *                   year:
 *                     type: number
 *                     description: År
 *                     example: 2024
 *                   mood_values:
 *                     type: array
 *                     items:
 *                       type: number
 *                       minimum: 1
 *                       maximum: 10
 *                     description: Humörvärden för veckan (7 värden)
 *                     example: [7, 8, 6, 9, 7, 8, 6]
 *     responses:
 *       200:
 *         description: Mood tracker-data sparat framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Internt serverfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

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
