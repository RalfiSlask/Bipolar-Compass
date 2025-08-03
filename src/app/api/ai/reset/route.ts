import { IBotData } from '@/app/types/chat';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/ai/reset:
 *   post:
 *     summary: Reset AI conversation
 *     description: Resets the conversation history for the Mental Health Assistant AI bot. This clears all previous conversation data and starts a fresh conversation session.
 *     tags:
 *       - AI Assistant
 *       - Chat
 *     security: []
 *     responses:
 *       200:
 *         description: Conversation reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message confirming the conversation has been reset
 *                   example: "Conversation reset"
 *       404:
 *         description: Bot data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the bot data could not be found
 *                   example: "Bot data not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Generic error message for server-side issues
 *                   example: "Error resetting conversation"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/ai/reset', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             }
 *           });
 *           const data = await response.json();
 *       - lang: cURL
 *         source: |
 *           curl -X POST /api/ai/reset \
 *             -H "Content-Type: application/json"
 */

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
