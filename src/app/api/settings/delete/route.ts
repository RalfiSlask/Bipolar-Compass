import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * This route is used to delete the user's account.
 * @param {NextRequest} req - The request object which contains the email.
 * @returns {NextResponse} Response object with success or error.
 */
export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const collection = await getCollection('thesis', 'users');

    const { email } = await req.json();
    const user = await collection.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    await collection.deleteOne({ email: email });
    return NextResponse.json({ message: 'User deleted' });
  } catch (err) {
    console.error('could not delete account:', err);
    return NextResponse.json(
      {
        message: 'could not delete account',
      },
      {
        status: 500,
      }
    );
  }
};
