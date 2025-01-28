import { ObjectId, OptionalId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { IAiConversationDocument, IConversationLog } from '../types/ai';

export class ConversationLog implements IConversationLog {
  constructor(
    public role: string = '',
    public content: string = '',
    readonly timestamp: string = new Date().toISOString()
  ) {}
}

export class AiConversation {
  public _id?: ObjectId;
  public user_id: string;
  constructor(
    public conversation_log: ConversationLog[],
    readonly created_at: string = new Date().toISOString(),
    public updated_at: string = new Date().toISOString()
  ) {
    this.user_id = uuidv4();
  }
  toDBObject(): OptionalId<IAiConversationDocument> {
    return {
      _id: this._id,
      user_id: this.user_id,
      conversation_log: this.conversation_log.map((log) => ({
        role: log.role,
        content: log.content,
        timestamp: log.timestamp,
      })),
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
