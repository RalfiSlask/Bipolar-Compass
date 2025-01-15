export interface IDiaryEntry {
  id: string;
  date: string;
  title: string;
  notes: string;
  mood?: 'glad' | 'neutral' | 'ledsen' | 'energisk' | 'trött';
  image?: IDiaryImage;
  created_at: string;
  updated_at: string;
}

export interface IUserDiary {
  user_id: string;
  entries: { [date: string]: IDiaryEntry };
  created_at: string;
  updated_at: string;
}

export interface IDiaryImage {
  url: string;
  ai_generated_text: string;
  created_at: string;
}
