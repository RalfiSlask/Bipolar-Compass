import { getCollection } from '@/app/utils/databaseUtils';
import { sendForgotPasswordEmail } from '@/app/utils/emailUtils';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Send forgot password email
 *     description: Sends a password reset email to the user's email address. Generates a secure reset token that expires in 1 hour and sends it via email.
 *     tags:
 *       - Authentication
 *       - Password Reset
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
 *                 description: The email address of the user requesting password reset
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message confirming the email was sent
 *                   example: "Email sent"
 *       400:
 *         description: Bad request - email is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email address is required to send a forgot password link"
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
 *                   example: "Failed to send forgot password email"
 *     security: []
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/forgot-password', {
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
 *           curl -X POST /api/forgot-password \
 *             -H "Content-Type: application/json" \
 *             -d '{"email": "user@example.com"}'
 */

/**
 * This route is used to send a forgot password link to the user.
 * @param {NextRequest} req - The request object which contains the email.
 * @returns {NextResponse} Response object with success or error.
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required to send a forgot password link' },
        { status: 400 }
      );
    }

    const collection = await getCollection('thesis', 'users');
    const user = await collection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'A user with this email address does not exist' },
        { status: 404 }
      );
    }

    // Generate a random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash the reset token
    const hashedToken = bcrypt.hashSync(resetToken, 10);

    await collection.updateOne(
      { email },
      {
        $set: {
          resetToken: hashedToken,
          resetTokenExpires: Date.now() + 3600000,
        },
      }
    );

    await sendForgotPasswordEmail({ email, resetToken });

    return NextResponse.json({ message: 'Email sent' }, { status: 200 });
  } catch (err) {
    console.error('Error sending forgot password email:', err);
    return NextResponse.json(
      { error: 'Failed to send forgot password email' },
      { status: 500 }
    );
  }
}
