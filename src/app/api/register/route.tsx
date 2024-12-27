import { NextResponse } from 'next/server';
import {
  getCollection,
  getVerificationCodeAsString,
} from '../../utils/helpers';
import bcrypt from 'bcryptjs';
import { emailTransporter } from '@/app/lib/nodemailer';
import { User } from '@/app/models/User';

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    const collection = await getCollection('thesis', 'users');
    const { name, email, password } = await req.json();
    console.log('Request body:', { name, email, password });

    // We check if email already exists
    const emailAlreadyUsed = await collection.findOne({ email });
    if (emailAlreadyUsed) {
      console.log('Email is already in use');
      return NextResponse.json({ error: 'Email finns redan' }, { status: 400 });
    }

    // We create the new user
    const verificationCode = getVerificationCodeAsString();
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(name, email, encryptedPassword, verificationCode);

    // Here we send the verification email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verifiera din e-postadress',
      text: `Hej!, använd denna kod för att verifiera diit konto: ${verificationCode}`,
    };

    const mailResult = await emailTransporter.sendMail(mailOptions);
    console.log('mail result: ', mailResult);

    try {
      const insertResult = await collection.insertOne(newUser);
      console.log('User successfully inserted into database:', insertResult);
    } catch (error) {
      console.error('Error inserting user into database:', error);
      return NextResponse.json(
        { error: 'Could not insert user into database' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'Användare skapad, logga in krävs' },
      { status: 201 }
    );
  } catch (error) {
    console.error('An error occurred during user creation:', error);
    return NextResponse.json(
      { error: 'Fel vid skapande av användare' },
      { status: 500 }
    );
  }
};
