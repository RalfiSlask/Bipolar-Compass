import { IUserDiary } from '@/app/types/diary';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

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
