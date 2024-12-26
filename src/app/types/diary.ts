export interface IDiary {
  user_id: string;
  title: string;
  notes: string;
  image: IDiaryImage;
  created_at: string;
  updated_at: string;
}

export interface IDiaryImage {
  url: string;
  ai_generated_text: string;
  created_at: string;
}
