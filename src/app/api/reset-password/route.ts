import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Resets a user's password using a valid reset token. The token must be valid and not expired. After successful password reset, the token is invalidated for security.
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
 *               - password
 *               - token
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: The new password (minimum 8 characters)
 *                 example: "newSecurePassword123"
 *               token:
 *                 type: string
 *                 description: The reset token received via email
 *                 example: "abc123def456ghi789"
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message confirming password reset
 *                   example: "Password reset successful"
 *       400:
 *         description: Bad request - invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or expired token"
 *                   description: Error message when token is invalid, expired, or missing
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 *     security: []
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/reset-password', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               password: 'newSecurePassword123',
 *               token: 'abc123def456ghi789'
 *             })
 *           });
 *           const result = await response.json();
 *       - lang: cURL
 *         source: |
 *           curl -X POST /api/reset-password \
 *             -H "Content-Type: application/json" \
 *             -d '{
 *               "password": "newSecurePassword123",
 *               "token": "abc123def456ghi789"
 *             }'
 */

/**
 * This route is used to reset the user's password.
 * @param {NextRequest} req - The request object which contains the password and token.
 * @returns {NextResponse} Response object with success or error.
 */
export const POST = async (req: NextRequest) => {
  try {
    const { password, token } = await req.json();

    const collection = await getCollection('thesis', 'users');
    const user = (await collection.findOne({
      resetTokenExpires: { $gt: Date.now() },
    })) as IUser | null;

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }
    if (!user.resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Compare the token with the hashed token
    const isTokenValid = await bcryptjs.compare(token, user.resetToken);

    if (!isTokenValid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    await collection.updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: '', resetTokenExpires: '' },
      }
    );

    return NextResponse.json(
      { message: 'Password reset successful' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error resetting password:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
