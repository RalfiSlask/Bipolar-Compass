import { ObjectId } from 'mongodb';

export interface IMessage {
  role: 'user' | 'system';
  content: string;
}

export interface IBotData {
  _id?: ObjectId;
  name: string;
  role: string;
  conversation: string;
  content?: string;
}
