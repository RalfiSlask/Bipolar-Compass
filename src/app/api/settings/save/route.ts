import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * This route is used to save the user's settings.
 * @param {NextRequest} req - The request object which contains the user.
 * @returns {NextResponse} Response object with success or error.
 */

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const collection = await getCollection('thesis', 'users');

    const { user } = await req.json();

    console.log(user);

    const userData = await collection.findOne({ email: user.email });

    if (userData) {
      return NextResponse.json({
        message: 'user settings got saved',
      });
    } else {
      return NextResponse.json({
        message: 'could not find user, settings not saved',
      });
    }
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
