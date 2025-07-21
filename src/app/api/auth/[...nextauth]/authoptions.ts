import clientPromise from '@/app/lib/mongodb';
import { MoodtrackerWeek } from '@/app/models/Moodtracker';
import { User } from '@/app/models/User';
import {
  ICustomSession,
  ICustomToken,
  ICustomUser,
} from '@/app/types/authoptions';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import bcrypt from 'bcryptjs';
import { NextAuthOptions, Session } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'you@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          throw new Error('Email eller lösenord saknas');
        }

        const user = await (await clientPromise)
          .db('thesis')
          .collection('users')
          .findOne({ email });

        if (!user) {
          throw new Error('Ingen användare finns med detta email');
        }

        // We check if the user is a Google user by checking if the password is empty
        if (!user.password || user.password === '') {
          throw new Error(
            'Detta konto är skapat via Google. Använd Google-inloggning.'
          );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Felaktigt lösenord');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          verificationCode: user.verificationCode,
          isVerified: user.isVerified,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET as string,
  },
  pages: {
    signIn: '/konto/logga-in',
    error: '/konto/logga-in',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const db = (await clientPromise).db('thesis');
        const usersCollection = db.collection('users');
        const moodTrackerCollection = db.collection('mood_tracker_weeks');

        const existingUser = await usersCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          // Create new user automatically for Google sign-in
          try {
            const newUser = new User(
              user.name || '',
              user.email || '',
              '' // No password for Google users
            );

            // Auto-verify Google users
            newUser.isVerified = true;

            const serializedUser = newUser.toJSON();

            const userResult = await usersCollection.insertOne(
              serializedUser as Document
            );
            const userId = userResult.insertedId.toString();

            // Create initial mood tracker
            const initialMoodTracker = MoodtrackerWeek.createDefault(userId);
            await moodTrackerCollection.insertOne(
              JSON.parse(JSON.stringify(initialMoodTracker))
            );
          } catch (error) {
            console.error('Error creating Google user:', error);
            return false;
          }
        }
      }
      return true;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: ICustomToken;
    }) {
      if (session.user && token) {
        try {
          const db = (await clientPromise).db('thesis');
          const usersCollection = db.collection('users');

          const actualUser = await usersCollection.findOne({
            email: token.email,
          });

          if (actualUser) {
            const actualUserId = actualUser._id.toString();

            // If the token user ID doesn't match the actual user ID, we update it
            if (token.id !== actualUserId) {
              console.log(
                `Session user ID mismatch: ${token.id} vs ${actualUserId}`
              );
              token.id = actualUserId;
            }
          }
        } catch (error) {
          console.error('Error validating session user ID:', error);
        }

        (session.user as ICustomUser).id = token.id as string;
        (session.user as ICustomUser).email = token.email;
        (session.user as ICustomUser).isVerified = token.isVerified ?? false;
      }
      return session as ICustomSession;
    },

    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: ICustomToken;
      user?: ICustomUser;
      trigger?: 'update' | 'signIn' | 'signUp';
      session?: ICustomSession;
    }) {
      if (trigger === 'update' && session) {
        return { ...token, ...session.user };
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isVerified = user.isVerified;
      }
      return token;
    },
  },
};
