import { IUserDiary } from '@/app/types/diary';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ date: string }>;
}

export const POST = async (
  request: NextRequest,
  { params }: RouteParams
) => {
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
