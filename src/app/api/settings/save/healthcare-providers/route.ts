import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * This route is used to save the user's healthcare providers settings.
 * @param {NextRequest} req - The request object which contains the healthcare providers and email.
 * @returns {NextResponse} Response object with success or error.
 */
export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { healthcare_providers, email } = await req.json();

    const collection = await getCollection('thesis', 'users');

    const user = (await collection.findOne({ email: email })) as IUser | null;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = {
      ...user,
      settings: { ...user.settings, healthcare_providers },
    };

    await collection.updateOne({ email: email }, { $set: updatedUser });

    return NextResponse.json({ message: 'Healthcare providers saved' });
  } catch (err) {
    console.error('could not save healthcare providers: ', err);
    return NextResponse.json(
      { error: 'could not save healthcare providers' },
      { status: 500 }
    );
  }
};
