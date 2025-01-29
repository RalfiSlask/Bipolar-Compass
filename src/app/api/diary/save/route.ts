import { DiaryEntry } from '@/app/models/Diary';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

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
