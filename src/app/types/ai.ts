import { Document, ObjectId } from 'mongodb';

export interface IConversationLog {
  role: string;
  content: string;
  timestamp: string;
}

export interface IAiImage {
  user_id: string;
  week: string;
  url: string;
  description: string;
  created_at: string;
}

export interface IAiConversation {
  _id?: ObjectId;
  user_id: string;
  conversation_log: IConversationLog[];
  created_at: string;
  updated_at: string;
}

export interface IAiConversationDocument extends Document {
  _id?: ObjectId;
  user_id: string;
  conversation_log: {
    role: string;
    content: string;
    timestamp: string;
  }[];
  created_at: string;
  updated_at: string;
}
