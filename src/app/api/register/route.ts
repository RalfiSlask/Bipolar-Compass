import { MoodtrackerWeek } from '@/app/models/Moodtracker';
import { User } from '@/app/models/User';
import { sendVerificationEmail } from '@/app/utils/emailUtils';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '../../utils/databaseUtils';

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registrera ny användare
 *     description: Skapar en ny användare med verifieringsmail och initial mood tracker-data
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Användarens namn
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Användarens e-postadress
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: Lösenord (minst 8 tecken)
 *                 example: "securepassword123"
 *     responses:
 *       201:
 *         description: Användare skapad framgångsrikt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created, verification link sent"
 *       400:
 *         description: Felaktig begäran - e-postadress redan använd
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "E-posten är redan använd."
 *       500:
 *         description: Internt serverfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Could not create user"
 */

/**
 * This route is used to register a new user.
 * @param {NextRequest} req - The request object which contains the name, email and password.
 * @returns {NextResponse} Response object with success or error.
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { name, email, password } = await req.json();

    const usersCollection = await getCollection('thesis', 'users');
    const moodTrackerCollection = await getCollection(
      'thesis',
      'mood_tracker_weeks'
    );

    // Check if email already exists
    const emailAlreadyUsed = await usersCollection.findOne({ email });
    if (emailAlreadyUsed) {
      console.log('Email is already in use');
      return NextResponse.json(
        { error: 'E-posten är redan använd.' },
        { status: 400 }
      );
    }

    // Create new user
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(name, email, encryptedPassword);
    const serializedUser = newUser.toJSON();

    try {
      // Save user first
      const userResult = await usersCollection.insertOne(
        serializedUser as Document
      );
      const userId = userResult.insertedId.toString();

      const initialMoodTracker = MoodtrackerWeek.createDefault(userId);
      await moodTrackerCollection.insertOne(
        JSON.parse(JSON.stringify(initialMoodTracker))
      );

      // Send verification email
      await sendVerificationEmail({
        verificationToken: newUser.verificationToken!,
        email: newUser.email,
      });

      return NextResponse.json(
        { message: 'User created, verification link sent' },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error during user creation:', error);

      return NextResponse.json(
        { error: 'Could not create user' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('An error occurred during user creation:', error);
    return NextResponse.json(
      { error: 'Error when creating user' },
      { status: 500 }
    );
  }
};
