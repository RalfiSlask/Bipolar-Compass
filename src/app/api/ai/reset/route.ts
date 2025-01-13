import { IBotData } from '@/app/types/chat';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextResponse } from 'next/server';

export const POST = async () => {
  try {
    const AiCollection = await getCollection('thesis', 'ai_assistant');
    const botData = await AiCollection.findOne<IBotData>({
      name: 'Mental Health Assistant',
    });

    if (!botData) {
      return NextResponse.json(
        { error: 'Bot data not found' },
        { status: 404 }
      );
    }

    await AiCollection.updateOne(
      {
        name: 'Mental Health Assistant',
      },
      { $set: { conversation: '' } }
    );

    return NextResponse.json(
      { message: 'Conversation reset' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error resetting conversation:', err);
    return NextResponse.json(
      { error: 'Error resetting conversation' },
      { status: 500 }
    );
  }
};
