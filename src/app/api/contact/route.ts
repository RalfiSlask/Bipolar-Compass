import { sendContactEmail } from '@/app/utils/emailUtils';
import { NextRequest, NextResponse } from 'next/server';
import xss from 'xss';

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Skicka kontaktmeddelande
 *     description: Skickar ett kontaktmeddelande från användaren till support
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 description: Avsändarens namn
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Avsändarens e-postadress
 *                 example: "user@example.com"
 *               message:
 *                 type: string
 *                 maxLength: 5000
 *                 description: Meddelandet
 *                 example: "Hej, jag har en fråga om..."
 *     responses:
 *       200:
 *         description: Meddelande skickat framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message sent"
 *       400:
 *         description: Felaktig begäran - ogiltig e-post eller för långt meddelande
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email address"
 *       500:
 *         description: Internt serverfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Could not send message"
 */

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
