import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { email } = await req.json();
    const collection = await getCollection('thesis', 'users');
    await collection.updateOne(
      { email },
      { $set: { 'profile.avatarUrl': '' } }
    );
    return NextResponse.json({ message: 'Avatar deleted' });
  } catch (error) {
    console.error('Error deleting avatar:', error);
    return NextResponse.json(
      { message: 'Failed to delete avatar' },
      { status: 500 }
    );
  }
}
