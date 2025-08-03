import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import { sendVerificationEmail } from '@/app/utils/emailUtils';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/verify/resend:
 *   post:
 *     summary: Resend verification email
 *     description: Resends a verification email to the user's email address. If the user doesn't have a verification token, a new one will be generated.
 *     tags:
 *       - Authentication
 *       - Email Verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user to resend verification to
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Verification email sent successfully or user already verified
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "The verification link has been resent!"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "User is already verified"
 *                     verified:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Bad request - email is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email address is required to send a verification link"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "A user with this email address does not exist"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to resend the verification link"
 *     security: []
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/verify/resend', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               email: 'user@example.com'
 *             })
 *           });
 *           const data = await response.json();
 *       - lang: cURL
 *         source: |
 *           curl -X POST /api/verify/resend \
 *             -H "Content-Type: application/json" \
 *             -d '{"email": "user@example.com"}'
 */

/**
 * This route is used to resend the verification email.
 * @param {Request} req - The request object which contains the email.
 * @returns {NextResponse} Response object with success or error.
 */

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required to send a verification link' },
        { status: 400 }
      );
    }

    const collection = await getCollection('thesis', 'users');
    const user = (await collection.findOne({ email })) as IUser | null;

    // Generate a new verification token if the user does not have one
    const newVerificationToken = crypto.randomBytes(32).toString('hex');
    const newTokenExpires = new Date(Date.now() + 3600 * 1000);

    await collection.updateOne(
      { email },
      {
        $set: {
          verificationToken: newVerificationToken,
          tokenExpires: newTokenExpires,
        },
      }
    );

    if (!user) {
      console.log('user does not exist');
      return NextResponse.json(
        { error: 'A user with this email address does not exist' },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      console.log('user is already verified');
      return NextResponse.json(
        { message: 'User is already verified', verified: true },
        { status: 200 }
      );
    }

    await sendVerificationEmail({
      verificationToken: newVerificationToken,
      email: user.email,
    });

    return NextResponse.json(
      { message: 'The verification link has been resent!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resending verification email:', error);
    return NextResponse.json(
      { error: 'Failed to resend the verification link' },
      { status: 500 }
    );
  }
};
