import { IUser } from '@/app/types/user';
import { getCollection } from '@/app/utils/databaseUtils';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/settings/save/security/password:
 *   put:
 *     summary: Update user password
 *     description: Updates the user's password after verifying the current password. The new password is hashed using bcrypt before storage.
 *     tags:
 *       - Settings
 *       - Security
 *       - Password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - email
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: User's current password for verification
 *                 example: "currentPassword123"
 *                 minLength: 1
 *               newPassword:
 *                 type: string
 *                 description: New password to set (will be hashed before storage)
 *                 example: "newSecurePassword456"
 *                 minLength: 6
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address for identification
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message in Swedish
 *                   example: "Lösenordet har uppdaterats"
 *       400:
 *         description: Bad request - Invalid current password or user has no password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message in Swedish
 *                   example: "Felaktigt nuvarande lösenord"
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message in Swedish
 *                   example: "Användaren hittades inte"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message in Swedish
 *                   example: "Ett fel uppstod vid uppdatering av lösenord"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/settings/save/security/password', {
 *             method: 'PUT',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer YOUR_TOKEN'
 *             },
 *             body: JSON.stringify({
 *               currentPassword: 'currentPassword123',
 *               newPassword: 'newSecurePassword456',
 *               email: 'user@example.com'
 *             })
 *           });
 *
 *           const data = await response.json();
 *           console.log('Password update result:', data.message);
 *       - lang: cURL
 *         source: |
 *           curl -X PUT /api/settings/save/security/password \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -d '{
 *               "currentPassword": "currentPassword123",
 *               "newPassword": "newSecurePassword456",
 *               "email": "user@example.com"
 *             }'
 */
export async function PUT(req: NextRequest) {
  try {
    const { currentPassword, newPassword, email } = await req.json();

    const collection = await getCollection('thesis', 'users');

    const user = (await collection.findOne({ email })) as IUser | null;

    if (!user) {
      return NextResponse.json(
        { message: 'Användaren hittades inte' },
        { status: 404 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { message: 'Användaren har ingen lösenord' },
        { status: 400 }
      );
    }

    const isValidPassword = await bcryptjs.compare(
      currentPassword,
      user.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Felaktigt nuvarande lösenord' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 12);

    await collection.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return NextResponse.json(
      { message: 'Lösenordet har uppdaterats' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password update error:', error);
    return NextResponse.json(
      { message: 'Ett fel uppstod vid uppdatering av lösenord' },
      { status: 500 }
    );
  }
}
