import { IUserDiary } from '@/app/types/diary';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ date: string }>;
}

/**
 * @swagger
 * /api/diary/{date}:
 *   post:
 *     summary: Get diary entry for specific date
 *     description: Retrieves a diary entry for a specific date for a given user. Returns the diary entry if it exists, otherwise returns null.
 *     tags:
 *       - Diary
 *       - User Data
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date for which to retrieve the diary entry (YYYY-MM-DD format)
 *         example: "2024-01-15"
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
 *                 description: The unique identifier of the user
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Diary entry retrieved successfully or null if no entry exists
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   description: Diary entry object
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: Title of the diary entry
 *                       example: "Min dag idag"
 *                     content:
 *                       type: string
 *                       description: Content of the diary entry
 *                       example: "Idag kände jag mig lugnare än vanligt..."
 *                     mood:
 *                       type: number
 *                       minimum: 1
 *                       maximum: 10
 *                       description: Mood rating from 1-10
 *                       example: 7
 *                     image:
 *                       type: string
 *                       description: Base64 encoded image (optional)
 *                       example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: When the entry was created
 *                       example: "2024-01-15T10:30:00Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: When the entry was last updated
 *                       example: "2024-01-15T15:45:00Z"
 *                 - type: null
 *                   description: No diary entry found for the specified date
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
 *                   example: "Internal server error"
 *     security: []
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/diary/2024-01-15', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               user_id: '507f1f77bcf86cd799439011'
 *             })
 *           });
 *           const diaryEntry = await response.json();
 *       - lang: cURL
 *         source: |
 *           curl -X POST /api/diary/2024-01-15 \
 *             -H "Content-Type: application/json" \
 *             -d '{"user_id": "507f1f77bcf86cd799439011"}'
 */

/**
 * This route is used to get a diary entry.
 * @param {NextRequest} request - The request object.
 * @param {RouteParams} params - The parameters of the route.
 * @returns {NextResponse} Response object with the diary entry or error.
 */
export const POST = async (request: NextRequest, { params }: RouteParams) => {
  try {
    const { user_id } = await request.json();
    const { date } = await params;

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const diaryCollection = await getCollection('thesis', 'diaries');
    const diary = await diaryCollection.findOne<IUserDiary>({ user_id });

    if (!diary) {
      return NextResponse.json(null);
    }

    const note = diary.entries[date];
    console.log('this is the note: ', note);
    return NextResponse.json(note || null);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
