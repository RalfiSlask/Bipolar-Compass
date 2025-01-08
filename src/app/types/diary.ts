export interface IDiary {
  user_id: string;
  notes: INote[];
  created_at: string;
  updated_at: string;
}

export interface INote {
  date: string;
  title: string;
  description: string;
  image: IDiaryImage;
}

export interface IDiaryImage {
  url: string;
  created_at: string;
}
