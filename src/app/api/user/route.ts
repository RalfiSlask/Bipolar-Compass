import { getCollection } from '@/app/utils/databaseUtils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Hämta användardata
 *     description: Hämtar användardata baserat på e-postadress, inklusive mood tracker-data
 *     tags:
 *       - User
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
 *                 description: Användarens e-postadress
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Användardata hämtad framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Användarens unika ID
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Användarens e-postadress
 *                 name:
 *                   type: string
 *                   description: Användarens namn
 *                 moodTrackerData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       user_id:
 *                         type: string
 *                       week_number:
 *                         type: number
 *                       year:
 *                         type: number
 *                       mood_values:
 *                         type: array
 *                         items:
 *                           type: number
 *       404:
 *         description: Användare hittades inte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internt serverfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch user data"
 */

/**
 * This route is used to get the user's data.
 * @param {NextRequest} req - The request object which contains the email.
 * @returns {NextResponse} Response object with the user's data or error.
 */
export const POST = async (req: NextRequest) => {
  try {
    const collection = await getCollection('thesis', 'users');

    const { email } = await req.json();
    const user = await collection.findOne({
      email,
    });

    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userWithOutPassword = {
      ...user,
      password: undefined,
    };

    const moodTrackerCollection = await getCollection(
      'thesis',
      'mood_tracker_weeks'
    );

    // Get the mood tracker data for the user and add it to the user's data
    const moodTrackerData = await moodTrackerCollection
      .find({
        user_id: user._id.toString(),
      })
      .toArray();

    const responseData = {
      ...userWithOutPassword,
      moodTrackerData,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
};
