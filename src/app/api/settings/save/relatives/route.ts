import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { relatives, email } = await req.json();

    const collection = await getCollection('thesis', 'users');

    const user = (await collection.findOne({ email: email })) as IUser | null;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = { ...user, settings: { ...user.settings, relatives } };

    await collection.updateOne({ email: email }, { $set: updatedUser });

    console.log('relatives: ', relatives);
    return NextResponse.json({ message: 'Relatives saved' });
  } catch (err) {
    console.error('could not save relatives: ', err);
    return NextResponse.json(
      { error: 'could not save relatives' },
      { status: 500 }
    );
  }
};
