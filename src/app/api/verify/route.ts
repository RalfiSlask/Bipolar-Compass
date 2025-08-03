import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/verify:
 *   get:
 *     summary: Verifiera användares e-postadress
 *     description: Verifierar en användares e-postadress med hjälp av en verifieringstoken
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Verifieringstoken som skickades via e-post
 *         example: "abc123def456ghi789"
 *     responses:
 *       200:
 *         description: E-postadress verifierad framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "E-mail address has been verified"
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Den verifierade e-postadressen
 *                   example: "user@example.com"
 *       400:
 *         description: Felaktig begäran - saknad token eller ogiltig token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Verification token is missing"
 *       500:
 *         description: Internt serverfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error during verification process"
 */

/**
 * This route is used to verify the user's email.
 * @param {NextRequest} req - The request object which contains the token.
 * @returns {NextResponse} Response object with success or error.
 */
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Verification token is missing' },
      { status: 400 }
    );
  }

  try {
    const collection = await getCollection('thesis', 'users');

    const user = (await collection.findOne({
      verificationToken: token,
    })) as IUser | null;

    if (!user) {
      const verifiedUser = await collection.findOne({ isVerified: true });

      if (verifiedUser) {
        return NextResponse.json(
          {
            message: 'User is already verified',
            verified: true,
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    if (!user.tokenExpires) {
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
    }

    if (user.isVerified) {
      return NextResponse.json(
        {
          message: 'User is already verified',
          verified: true,
        },
        { status: 200 }
      );
    }

    // If the token has expired, return an error
    if (new Date() > new Date(user.tokenExpires)) {
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
    }

    await collection.updateOne(
      { verificationToken: token },
      {
        $set: { isVerified: true },
        $unset: { verificationToken: '', tokenExpires: '' },
      }
    );

    return NextResponse.json(
      { message: 'E-mail address has been verified', email: user.email },
      { status: 200 }
    );
  } catch (err) {
    console.error('Could not verify user: ', err);
    return NextResponse.json(
      { error: 'Server error during verification process' },
      { status: 500 }
    );
  }
};
