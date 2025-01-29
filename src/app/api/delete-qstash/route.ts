import { Client } from '@upstash/qstash';
import { NextRequest, NextResponse } from 'next/server';

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

/**
 * This route is used to delete QStash messages on upstash qstash that is connected to vercel.
 * @param {NextRequest} req - The request object which contains the messageId to delete.
 * @returns {NextResponse} Response object with success or error.
 */
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    if (!body || !body.messageId) {
      console.error('Missing messageId in request body');
      return NextResponse.json(
        { error: 'No messageId provided' },
        { status: 400 }
      );
    }

    const messageIds = Array.isArray(body.messageId)
      ? body.messageId
      : [body.messageId];

    for (const id of messageIds) {
      await qstashClient.messages.delete(id);
    }

    console.log('All messages deleted successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete QStash messages:', error);
    return NextResponse.json(
      { error: 'Failed to delete messages' },
      { status: 500 }
    );
  }
};
