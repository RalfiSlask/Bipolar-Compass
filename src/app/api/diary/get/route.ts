import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/diary/get:
 *   post:
 *     summary: Hämta dagboksinlägg
 *     description: Hämtar alla dagboksinlägg för en användare
 *     tags:
 *       - Diary
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
 *     responses:
 *       200:
 *         description: Dagboksinlägg hämtade framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: Användarens ID
 *                 entries:
 *                   type: object
 *                   description: Dagboksinlägg organiserade per datum
 *                   additionalProperties:
 *                     $ref: '#/components/schemas/DiaryEntry'
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: När dagboken skapades
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: När dagboken senast uppdaterades
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
 *                   example: "Internal server error"
 */

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
