import clientPromise from '@/app/lib/mongodb';
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

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
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

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Lösenordet är fel');
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

  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session;
      token: ICustomToken;
    }) {
      if (session.user && token) {
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
