import { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/app/lib/mongodb';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
/* import { NextApiHandler } from 'next'; */

interface ICustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  isVerified?: boolean;
}

interface ICustomToken extends JWT {
  id?: string;
  isVerified?: boolean;
}

interface ICustomSession extends Session {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    isVerified: boolean;
  };
  expires: string;
}

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

        console.log('this is the email and password: ', email, password);

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
      if (session.user && token.id) {
        (session.user as ICustomUser).id = token.id;
        (session.user as ICustomUser).isVerified = token.isVerified ?? false;
      }
      return session as ICustomSession;
    },

    async jwt({ token, user }: { token: ICustomToken; user?: ICustomUser }) {
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified;
      }
      return token;
    },
  },
};
