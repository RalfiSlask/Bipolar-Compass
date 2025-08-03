import { DiaryEntry } from '@/app/models/Diary';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/diary/save:
 *   post:
 *     summary: Spara dagboksinlägg
 *     description: Sparar eller uppdaterar ett dagboksinlägg för en användare
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
 *               - date
 *               - entry
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: Användarens ID
 *                 example: "user123"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Datum för inlägget
 *                 example: "2024-01-15"
 *               entry:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unikt ID för inlägget (valfritt, genereras automatiskt)
 *                   title:
 *                     type: string
 *                     description: Titel för inlägget
 *                     example: "Min dag"
 *                   notes:
 *                     type: string
 *                     description: Innehåll i inlägget
 *                     example: "Idag kände jag mig..."
 *                   mood:
 *                     type: number
 *                     minimum: 1
 *                     maximum: 10
 *                     description: Humörskala 1-10
 *                     example: 7
 *                   image:
 *                     type: string
 *                     description: Base64-kodad bild (valfritt)
 *     responses:
 *       200:
 *         description: Dagboksinlägg sparat framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Diary entry saved"
 *                 entry:
 *                   $ref: '#/components/schemas/DiaryEntry'
 *       400:
 *         description: Felaktig begäran - saknade fält
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User ID, date and entry are required"
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
 * This route is used to save a diary entry.
 * @param {NextRequest} req - The request object which contains the user_id, date and entry.
 * @returns {NextResponse} Response object with success or error.
 */
export const POST = async (req: NextRequest) => {
  try {
    const { user_id, date, entry } = await req.json();

    if (!user_id || !date || !entry) {
      return NextResponse.json(
        { error: 'User ID, date and entry are required' },
        { status: 400 }
      );
    }

    const diaryCollection = await getCollection('thesis', 'diaries');

    // Create a new diary entry, uses crypto to generate a random UUID if no id is provided
    const diaryEntry = new DiaryEntry(
      entry.id || crypto.randomUUID(),
      date,
      entry.title,
      entry.notes,
      entry.mood,
      entry.image
    );

    const result = await diaryCollection.updateOne(
      { user_id },
      {
        $set: {
          [`entries.${date}`]: diaryEntry,
          updated_at: new Date().toISOString(),
        },
        $setOnInsert: {
          created_at: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    if (result.acknowledged) {
      return NextResponse.json({
        message: 'Diary entry saved',
        entry: diaryEntry,
      });
    } else {
      throw new Error('Failed to save diary entry');
    }
  } catch (error) {
    console.error('Error saving diary entry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
