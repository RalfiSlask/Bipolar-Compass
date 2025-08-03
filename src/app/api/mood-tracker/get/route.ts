import { MoodtrackerWeek } from '@/app/models/Moodtracker';
import { IMoodTrackerWeek } from '@/app/types/moodtracker';
import { getCollection } from '@/app/utils/databaseUtils';
import { Document, WithId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/mood-tracker/get:
 *   post:
 *     summary: Hämta mood tracker-data
 *     description: Hämtar mood tracker-data för en användare, med möjlighet att filtrera på vecka och år
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
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: Användarens ID
 *                 example: "user123"
 *               week:
 *                 type: number
 *                 description: Veckonummer (valfritt, för att filtrera på specifik vecka)
 *                 example: 3
 *               year:
 *                 type: number
 *                 description: År (valfritt, för att filtrera på specifikt år)
 *                 example: 2024
 *     responses:
 *       200:
 *         description: Mood tracker-data hämtad framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unikt ID för veckodata
 *                 user_id:
 *                   type: string
 *                   description: Användarens ID
 *                 week_number:
 *                   type: number
 *                   description: Veckonummer
 *                 year:
 *                   type: number
 *                   description: År
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: När data skapades
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: När data senast uppdaterades
 *                 mood_values:
 *                   type: array
 *                   items:
 *                     type: number
 *                     minimum: 1
 *                     maximum: 10
 *                   description: Humörvärden för veckan (7 värden)
 *       400:
 *         description: Felaktig begäran - saknad user_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User ID is required"
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
 * This route is used to get the mood tracker data to display in the mood tracker page.
 * @param {NextRequest} req - The request object which contains the user_id, week and year.
 * @returns {NextResponse} Response object with the mood tracker data or error.
 */
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

    // If the mood tracker data is found, return the data by converting the mongo document to a IMoodTrackerWeek object
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
