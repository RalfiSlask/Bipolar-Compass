import { IDiaryEntry, IDiaryImage, IUserDiary } from '../types/diary';

export class UserDiary implements IUserDiary {
  constructor(
    public user_id: string,
    public entries: { [date: string]: DiaryEntry } = {},
    readonly created_at: string = new Date().toISOString(),
    public updated_at: string = new Date().toISOString()
  ) {}

  addEntry(date: string, entry: DiaryEntry) {
    this.entries[date] = entry;
    this.updated_at = new Date().toISOString();
  }

  getEntry(date: string): DiaryEntry | undefined {
    return this.entries[date];
  }

  updateEntry(
    date: string,
    updates: Partial<Omit<IDiaryEntry, 'update' | 'addImage'>>
  ) {
    if (this.entries[date]) {
      const currentEntry = this.entries[date];
      const updatedEntry = new DiaryEntry(
        currentEntry.id,
        currentEntry.date,
        updates.title ?? currentEntry.title,
        updates.notes ?? currentEntry.notes,
        updates.mood ?? currentEntry.mood,
        updates.image ?? currentEntry.image,
        currentEntry.created_at,
        new Date().toISOString()
      );
      this.entries[date] = updatedEntry;
      this.updated_at = new Date().toISOString();
    }
  }

  deleteEntry(date: string) {
    if (this.entries[date]) {
      delete this.entries[date];
      this.updated_at = new Date().toISOString();
    }
  }
}

export class DiaryEntry implements IDiaryEntry {
  constructor(
    public id: string = crypto.randomUUID(),
    public date: string = new Date().toISOString().split('T')[0],
    public title: string = '',
    public notes: string = '',
    public mood?: 'glad' | 'neutral' | 'ledsen' | 'energisk' | 'trött',
    public image?: DiaryImage,
    readonly created_at: string = new Date().toISOString(),
    public updated_at: string = new Date().toISOString()
  ) {}

  update(title: string, notes: string, mood?: string) {
    this.title = title;
    this.notes = notes;
    if (mood) {
      this.mood = mood as 'glad' | 'neutral' | 'ledsen' | 'energisk' | 'trött';
    }
    this.updated_at = new Date().toISOString();
  }

  addImage(image: DiaryImage) {
    this.image = image;
    this.updated_at = new Date().toISOString();
  }
}

export class DiaryImage implements IDiaryImage {
  constructor(
    public url: string = '',
    public ai_generated_text: string = '',
    readonly created_at: string = new Date().toISOString()
  ) {}
}
