import { AiConversation, ConversationLog } from '@/app/models/Ai';
import { IAiConversation, IConversationLog } from '@/app/types/ai';
import { getCollection } from '@/app/utils/databaseUtils';
import { OptionalId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export const POST = async (req: NextRequest) => {
  try {
    const { message, userId } = await req.json();
    const AiCollection = await getCollection('thesis', 'conversations');

    let conversation = await AiCollection.findOne<IAiConversation>({
      user_id: userId.toString(),
    });

    if (!conversation) {
      const newConversation = new AiConversation([]);
      newConversation.user_id = userId.toString();
      const result = await AiCollection.insertOne(
        newConversation.toDBObject() as unknown as OptionalId<Document>
      );
      conversation = {
        ...newConversation,
        _id: result.insertedId,
      };
    }
    const botCollection = await getCollection('thesis', 'ai_assistant');
    const botData = await botCollection.findOne<IConversationLog>({
      name: 'Mental Health Assistant',
    });
    const systemPrompt = botData?.role || 'Du är en expert på bipolaritet...';

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversation?.conversation_log.map((log: IConversationLog) => ({
        role: log.role,
        content: log.content,
      })),
      { role: 'user', content: message },
    ];

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages as ChatCompletionMessageParam[],
    });

    const assistantMessage = chatResponse.choices[0].message.content;
    if (!assistantMessage) {
      return NextResponse.json({
        error: 'No assistant message received from open ai',
      });
    }

    const updatedLogs = [
      ...conversation.conversation_log,
      new ConversationLog('user', message),
      new ConversationLog('assistant', assistantMessage),
    ];

    await AiCollection.updateOne(
      { user_id: userId.toString() },
      {
        $set: {
          conversation_log: updatedLogs,
          updated_at: new Date().toISOString(),
        },
      }
    );

    return NextResponse.json({
      answer: assistantMessage,
      context: updatedLogs,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
