import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/settings/save/profile:
 *   put:
 *     summary: Save user profile settings
 *     description: Updates the user's profile information including email, age, gender, and diagnosis. Validates email uniqueness if email is being changed.
 *     tags:
 *       - Settings
 *       - Profile
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
 *               - values
 *               - originalEmail
 *             properties:
 *               values:
 *                 type: object
 *                 required:
 *                   - email
 *                   - age
 *                   - gender
 *                   - diagnosis
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: User's email address (can be updated)
 *                     example: "user@example.com"
 *                   age:
 *                     type: number
 *                     description: User's age
 *                     minimum: 0
 *                     maximum: 120
 *                     example: 35
 *                   gender:
 *                     type: string
 *                     description: User's gender identity
 *                     enum: ["Man", "Kvinna", "Icke-binär", "Annat", "Vill inte ange"]
 *                     example: "Kvinna"
 *                   diagnosis:
 *                     type: string
 *                     description: User's bipolar diagnosis type
 *                     enum: ["Bipolär typ 1", "Bipolär typ 2", "Cyklotymi", "Annat", "Vill inte ange"]
 *                     example: "Bipolär typ 1"
 *                 example:
 *                   email: "user@example.com"
 *                   age: 35
 *                   gender: "Kvinna"
 *                   diagnosis: "Bipolär typ 1"
 *               originalEmail:
 *                 type: string
 *                 format: email
 *                 description: Original email address for user identification and email change validation
 *                 example: "olduser@example.com"
 *     responses:
 *       200:
 *         description: Profile settings saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Profile settings saved"
 *                 user:
 *                   type: object
 *                   description: Updated user object with profile information
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
 *                     profile:
 *                       type: object
 *                       properties:
 *                         age:
 *                           type: number
 *                           description: User's age
 *                           example: 35
 *                         gender:
 *                           type: string
 *                           description: User's gender identity
 *                           example: "Kvinna"
 *                         diagnosis:
 *                           type: string
 *                           description: User's bipolar diagnosis type
 *                           example: "Bipolär typ 1"
 *       400:
 *         description: Bad request - Email already exists or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Email already exists"
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
 *                   example: "Error saving settings"
 *     x-code-samples:
 *       - lang: JavaScript
 *         source: |
 *           const profileData = {
 *             values: {
 *               email: "user@example.com",
 *               age: 35,
 *               gender: "Kvinna",
 *               diagnosis: "Bipolär typ 1"
 *             },
 *             originalEmail: "olduser@example.com"
 *           };
 *
 *           const response = await fetch('/api/settings/save/profile', {
 *             method: 'PUT',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': 'Bearer YOUR_TOKEN'
 *             },
 *             body: JSON.stringify(profileData)
 *           });
 *
 *           const data = await response.json();
 *           console.log('Profile save result:', data.message);
 *           console.log('Updated user:', data.user);
 *       - lang: cURL
 *         source: |
 *           curl -X PUT /api/settings/save/profile \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -d '{
 *               "values": {
 *                 "email": "user@example.com",
 *                 "age": 35,
 *                 "gender": "Kvinna",
 *                 "diagnosis": "Bipolär typ 1"
 *               },
 *               "originalEmail": "olduser@example.com"
 *             }'
 */
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const collection = await getCollection('thesis', 'users');

    const { values, originalEmail } = await req.json();
    const { email, age, gender, diagnosis } = values;

    if (email !== originalEmail) {
      const existingUser = await collection.findOne({ email: email });
      if (existingUser) {
        console.log('API Route - Duplicate email found:', email);
        return NextResponse.json(
          { message: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    await collection.updateOne(
      { email: originalEmail },
      {
        $set: {
          email: email,
          'profile.age': age,
          'profile.gender': gender,
          'profile.diagnosis': diagnosis,
        },
      }
    );

    const updatedUser = await collection.findOne({ email: email });

    if (!updatedUser) {
      console.log('API Route - Updated user not found!');
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Profile settings saved',
      user: updatedUser,
    });
  } catch (error) {
    console.error('API Route - Error saving settings:', error);
    return NextResponse.json(
      { message: 'Error saving settings' },
      { status: 500 }
    );
  }
}
