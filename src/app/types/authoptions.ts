import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export interface ICustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  isVerified?: boolean;
}

export interface ICustomToken extends JWT {
  id?: string;
  isVerified?: boolean;
}

export interface ICustomSession extends Session {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    isVerified: boolean;
  };
  expires: string;
}
