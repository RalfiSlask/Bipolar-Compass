import { IConversationLog, IAiConversation, IAiImage } from '../types/ai';

export class ConversationLog implements IConversationLog {
  constructor(
    public role: string = '',
    public content: string = '',
    readonly timestamp: string = new Date().toISOString()
  ) {}
}

export class AiImage implements IAiImage {
  constructor(
    public user_id: string = '',
    public week: string = '',
    public url: string = '',
    public description: string = '',
    readonly created_at: string = new Date().toISOString()
  ) {}
}

export class AiConversation implements IAiConversation {
  constructor(
    public user_id: string = '',
    public conversation_log: ConversationLog[],
    readonly created_at: string = new Date().toISOString(),
    public updated_at: string = new Date().toISOString()
  ) {}
}
