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
  user_id: string;
  conversation_log: IConversationLog[];
  created_at: string;
  updated_at: string;
}
