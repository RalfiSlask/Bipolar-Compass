import { sendContactEmail } from '@/app/utils/emailUtils';
import { NextRequest, NextResponse } from 'next/server';
import xss from 'xss';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { name, email, message } = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    const sanitizedName = xss(name.trim());
    const sanitizedMessage = xss(message.trim());
    const sanitizedEmail = email.trim().toLowerCase();

    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      return NextResponse.json(
        { error: 'All fields must be filled' },
        { status: 400 }
      );
    }

    if (sanitizedName.length > 100 || sanitizedMessage.length > 5000) {
      return NextResponse.json(
        { error: 'Message or name is too long' },
        { status: 400 }
      );
    }

    await sendContactEmail({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
    });

    return NextResponse.json({ message: 'Message sent' }, { status: 200 });
  } catch (error) {
    console.error('An error occurred when sending the message:', error);
    return NextResponse.json(
      { error: 'Could not send message' },
      { status: 500 }
    );
  }
};
