import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/settings/save/profile/avatar:
 *   put:
 *     summary: Update user profile avatar URL
 *     description: Updates the user's profile avatar URL in the database. This endpoint is typically called after a successful avatar upload to S3.
 *     tags:
 *       - Settings
 *       - Profile
 *       - Avatar
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - avatarUrl
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address for identification
 *                 example: "user@example.com"
 *               avatarUrl:
 *                 type: string
 *                 format: uri
 *                 description: Public URL of the uploaded avatar image from S3
 *                 example: "https://bucket-name.s3.region.amazonaws.com/avatars/avatar-user_example.com-1703123456789.jpg"
 *     responses:
 *       200:
 *         description: Avatar URL updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Avatar updated"
 *       400:
 *         description: Bad request - Invalid data format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid avatar URL format"
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
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update avatar"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const avatarData = {
 *             email: "user@example.com",
 *             avatarUrl: "https://bucket-name.s3.region.amazonaws.com/avatars/avatar-user_example.com-1703123456789.jpg"
 *           };
 *
 *           const response = await fetch('/api/settings/save/profile/avatar', {
 *             method: 'PUT',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer YOUR_TOKEN'
 *             },
 *             body: JSON.stringify(avatarData)
 *           });
 *
 *           const data = await response.json();
 *           console.log('Avatar update result:', data.message);
 *       - lang: cURL
 *         source: |
 *           curl -X PUT /api/settings/save/profile/avatar \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -d '{
 *               "email": "user@example.com",
 *               "avatarUrl": "https://bucket-name.s3.region.amazonaws.com/avatars/avatar-user_example.com-1703123456789.jpg"
 *             }'
 *     x-notes:
 *       - This endpoint is typically called after a successful avatar upload to S3
 *       - The avatarUrl should be a valid S3 public URL
 *       - The endpoint updates the profile.avatarUrl field in the user document
 */
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const collection = await getCollection('thesis', 'users');

    const { email, avatarUrl } = await req.json();

    const isUser = await collection.findOne({ email });

    if (!isUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    await collection.updateOne(
      { email },
      { $set: { 'profile.avatarUrl': avatarUrl } }
    );

    return NextResponse.json({ message: 'Avatar updated' });
  } catch (error) {
    console.error('API Route - Error updating avatar:', error);
    return NextResponse.json(
      { message: 'Failed to update avatar' },
      { status: 500 }
    );
  }
}
