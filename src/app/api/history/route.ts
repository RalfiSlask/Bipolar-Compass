import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/history:
 *   post:
 *     summary: Get mood tracker history
 *     description: Retrieves all mood tracker data for a specific user to display in the history page. Returns an array of mood tracker entries organized by weeks.
 *     tags:
 *       - History
 *       - Mood Tracker
 *       - User Data
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
 *                 description: The unique identifier of the user whose history to retrieve
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Mood tracker history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: Array of mood tracker week entries
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier for the mood tracker week entry
 *                     example: "507f1f77bcf86cd799439012"
 *                   user_id:
 *                     type: string
 *                     description: The user ID this entry belongs to
 *                     example: "507f1f77bcf86cd799439011"
 *                   week_start:
 *                     type: string
 *                     format: date
 *                     description: Start date of the week (YYYY-MM-DD)
 *                     example: "2024-01-01"
 *                   week_end:
 *                     type: string
 *                     format: date
 *                     description: End date of the week (YYYY-MM-DD)
 *                     example: "2024-01-07"
 *                   mood_entries:
 *                     type: array
 *                     description: Array of daily mood entries for the week
 *                     items:
 *                       type: object
 *                       properties:
 *                         date:
 *                           type: string
 *                           format: date
 *                           description: Date of the mood entry
 *                           example: "2024-01-01"
 *                         mood_score:
 *                           type: number
 *                           minimum: 1
 *                           maximum: 10
 *                           description: Mood score from 1-10
 *                           example: 7
 *                         notes:
 *                           type: string
 *                           description: Optional notes for the day
 *                           example: "Kände mig lugnare idag"
 *                         activities:
 *                           type: array
 *                           description: Activities that affected mood
 *                           items:
 *                             type: string
 *                           example: ["exercise", "meditation", "social"]
 *                   average_mood:
 *                     type: number
 *                     description: Average mood score for the week
 *                     example: 6.5
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: When this week entry was created
 *                     example: "2024-01-01T00:00:00Z"
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     description: When this week entry was last updated
 *                     example: "2024-01-07T23:59:59Z"
 *       400:
 *         description: Bad request - user_id is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User ID is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error details from the server
 *                   example: "Database connection error"
 *     security: []
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/history', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               user_id: '507f1f77bcf86cd799439011'
 *             })
 *           });
 *           const historyData = await response.json();
 *       - lang: cURL
 *         source: |
 *           curl -X POST /api/history \
 *             -H "Content-Type: application/json" \
 *             -d '{"user_id": "507f1f77bcf86cd799439011"}'
 */

/**
 * This route is used to get the mood tracker data to display in the history page.
 * @param {NextRequest} req - The request object which contains the user_id.
 * @returns {NextResponse} Response object with the mood tracker data or error.
 */
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
