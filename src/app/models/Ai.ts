import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { IAiConversation, IConversationLog } from '../types/ai';

export class ConversationLog implements IConversationLog {
  constructor(
    public role: string = '',
    public content: string = '',
    readonly timestamp: string = new Date().toISOString()
  ) {}
}

export class AiConversation implements IAiConversation {
  public _id?: ObjectId;
  public user_id: string;
  constructor(
    public conversation_log: ConversationLog[],
    readonly created_at: string = new Date().toISOString(),
    public updated_at: string = new Date().toISOString()
  ) {
    this.user_id = uuidv4();
  }
}
