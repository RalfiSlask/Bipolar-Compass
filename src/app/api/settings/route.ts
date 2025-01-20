import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const collection = await getCollection('thesis', 'users');

    const { email } = await req.json();

    console.log(email);

    const user = await collection.findOne(
      { email: email },
      { projection: { password: 0 } }
    );
    console.log(user);
    return NextResponse.json({
      user: user,
    });
  } catch (err) {
    console.error('server error: ', err);
    return NextResponse.json(
      {
        error: 'server error',
      },
      {
        status: 500,
      }
    );
  }
};
