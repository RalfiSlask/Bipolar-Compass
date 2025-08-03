import { IUserDiary } from '@/app/types/diary';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/diary/delete:
 *   post:
 *     summary: Delete diary entry
 *     description: Deletes a specific diary entry by entry ID. The entry is completely removed from the user's diary and cannot be recovered.
 *     tags:
 *       - Diary
 *       - User Data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - entry_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The unique identifier of the user who owns the diary entry
 *                 example: "507f1f77bcf86cd799439011"
 *               entry_id:
 *                 type: string
 *                 description: The unique identifier of the diary entry to delete
 *                 example: "entry_123456789"
 *     responses:
 *       200:
 *         description: Diary entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message confirming the deletion
 *                   example: "Diary entry deleted"
 *                 deleted_id:
 *                   type: string
 *                   description: The ID of the deleted entry
 *                   example: "entry_123456789"
 *       400:
 *         description: Bad request - missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User ID and entry ID are required"
 *       404:
 *         description: Diary or entry not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Diary not found"
 *                   description: Error message when diary or specific entry is not found
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
 *           const response = await fetch('/api/diary/delete', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               user_id: '507f1f77bcf86cd799439011',
 *               entry_id: 'entry_123456789'
 *             })
 *           });
 *           const result = await response.json();
 *       - lang: cURL
 *         source: |
 *           curl -X POST /api/diary/delete \
 *             -H "Content-Type: application/json" \
 *             -d '{
 *               "user_id": "507f1f77bcf86cd799439011",
 *               "entry_id": "entry_123456789"
 *             }'
 */

/**
 * This route is used to delete a diary entry.
 * @param {NextRequest} req - The request object which contains the user_id and entry_id.
 * @returns {NextResponse} Response object with success or error.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { user_id, entry_id } = await req.json();

    if (!user_id || !entry_id) {
      return NextResponse.json(
        { error: 'User ID and entry ID are required' },
        { status: 400 }
      );
    }

    const diaryCollection = await getCollection('thesis', 'diaries');

    const diary = (await diaryCollection.findOne({
      user_id,
    })) as IUserDiary | null;
    if (!diary || !diary.entries) {
      return NextResponse.json({ error: 'Diary not found' }, { status: 404 });
    }

    const dateToDelete = Object.entries(diary.entries).find(
      ([_, entry]) => entry.id === entry_id
    )?.[0];

    if (!dateToDelete) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    const result = await diaryCollection.updateOne(
      { user_id },
      {
        $unset: { [`entries.${dateToDelete}`]: '' },
        $set: { updated_at: new Date().toISOString() },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Diary not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Diary entry deleted',
      deleted_id: entry_id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
