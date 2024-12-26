import { IDiary, IDiaryImage } from '../types/diary';

export class Diary implements IDiary {
  constructor(
    public user_id: string = '',
    public title: string = '',
    public notes: string = '',
    public image: DiaryImage,
    readonly created_at: string = new Date().toISOString(),
    public updated_at: string = new Date().toISOString()
  ) {}

  updateDiary(title: string, notes: string) {
    this.title = title;
    this.notes = notes;
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
