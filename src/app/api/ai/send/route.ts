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

/**
 * @swagger
 * /api/ai/send:
 *   post:
 *     summary: Send message to AI assistant
 *     description: Sends a user message to the Mental Health Assistant AI and receives a response. The conversation is stored and maintained for context. If no conversation exists for the user, a new one is created.
 *     tags:
 *       - AI Assistant
 *       - Chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - userId
 *             properties:
 *               message:
 *                 type: string
 *                 description: The user's message to send to the AI assistant
 *                 example: "Jag har känt mig nedstämd den senaste tiden, vad kan jag göra?"
 *               userId:
 *                 type: string
 *                 description: The unique identifier of the user sending the message
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: AI response received successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 answer:
 *                   type: string
 *                   description: The AI assistant's response to the user's message
 *                   example: "Det låter som att du kan uppleva depression. Här är några strategier som kan hjälpa..."
 *                 context:
 *                   type: array
 *                   description: The complete conversation history including the new exchange
 *                   items:
 *                     type: object
 *                     properties:
 *                       role:
 *                         type: string
 *                         enum: [user, assistant]
 *                         description: The role of the message sender
 *                       content:
 *                         type: string
 *                         description: The content of the message
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         description: When the message was sent
 *       400:
 *         description: Bad request - missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Message and userId are required"
 *       500:
 *         description: Internal server error or OpenAI API error
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
 *           const response = await fetch('/api/ai/send', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               message: 'Jag har känt mig nedstämd den senaste tiden, vad kan jag göra?',
 *               userId: '12345'
 *             })
 *           });
 *           const data = await response.json();
 *       - lang: cURL
 *         source: |
 *           curl -X POST /api/ai/send \
 *             -H "Content-Type: application/json" \
 *             -d '{
 *               "message": "Jag har känt mig nedstämd den senaste tiden, vad kan jag göra?",
 *               "userId": "12345"
 *             }'
 */

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
