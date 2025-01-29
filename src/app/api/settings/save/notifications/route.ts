import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * This route is used to save the user's notification settings.
 * @param {NextRequest} req - The request object which contains the emailNotification, email and relativeNotifications.
 * @returns {NextResponse} Response object with success or error.
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { emailNotification, email, relativeNotifications } =
      await req.json();
    const collection = await getCollection('thesis', 'users');

    const result = await collection.updateOne(
      { email: email },
      {
        $set: {
          'settings.notifications_enabled': emailNotification,
          'settings.relatives': relativeNotifications,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const updatedUser = await collection.findOne({ email: email });

    return NextResponse.json({
      message: 'Notifications saved',
      user: updatedUser,
    });
  } catch (err) {
    console.error('could not save notifications: ', err);
    return NextResponse.json(
      { message: 'Could not save notifications' },
      { status: 500 }
    );
  }
};
