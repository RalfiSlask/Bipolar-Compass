import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/settings:
 *   post:
 *     summary: Get user settings and profile data
 *     description: Retrieves user profile information and settings from the database based on email address
 *     tags:
 *       - Settings
 *       - User Profile
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
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address to retrieve settings for
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: User settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: User profile data (password field excluded)
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: MongoDB ObjectId
 *                       example: "507f1f77bcf86cd799439011"
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: User's email address
 *                       example: "user@example.com"
 *                     name:
 *                       type: string
 *                       description: User's full name
 *                       example: "John Doe"
 *                     avatar:
 *                       type: string
 *                       format: uri
 *                       description: URL to user's avatar image
 *                       example: "https://bucket-name.s3.region.amazonaws.com/avatars/avatar-user_example.com-1703123456789.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Account creation timestamp
 *                       example: "2024-01-15T10:30:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Last profile update timestamp
 *                       example: "2024-01-20T14:45:00.000Z"
 *       400:
 *         description: Bad request - Invalid email format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email format"
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "server error"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/settings', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer YOUR_TOKEN'
 *             },
 *             body: JSON.stringify({
 *               email: 'user@example.com'
 *             })
 *           });
 *
 *           const data = await response.json();
 *           console.log('User settings:', data.user);
 *       - lang: cURL
 *         source: |
 *           curl -X POST /api/settings \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -d '{"email": "user@example.com"}'
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const collection = await getCollection('thesis', 'users');

    const { email } = await req.json();

    const user = await collection.findOne(
      { email: email },
      { projection: { password: 0 } }
    );
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
