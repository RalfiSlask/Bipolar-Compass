import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const collection = await getCollection('thesis', 'users');

    const { email, avatarUrl } = await req.json();

    const isUser = await collection.findOne({ email });

    if (!isUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    await collection.updateOne(
      { email },
      { $set: { 'profile.avatarUrl': avatarUrl } }
    );

    return NextResponse.json({ message: 'Avatar updated' });
  } catch (error) {
    console.error('API Route - Error updating avatar:', error);
    return NextResponse.json(
      { message: 'Failed to update avatar' },
      { status: 500 }
    );
  }
}
