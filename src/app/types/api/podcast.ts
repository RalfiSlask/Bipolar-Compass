export interface IPodcastResult {
  count: number;
  next_offset: number;
  total: number;
  took: number;
  results: IPodcast[];
}

export interface IPodcast {
  audio: string;
  audio_length_sec: number;
  rss: string;
  description_highlighted: string;
  description_original: string;
  title_highlighted: string;
  title_original: string;
  transcripts_highlighted: string[];
  image: string;
  thumbnail: string;
  itunes_id: number;
  pub_date_ms: number;
  id: string;
  listennotes_url: string;
  explicit_content: boolean;
  link: string;
  guid_from_rss: string;
  podcast: IPodcastMetadata;
}

export interface IPodcastMetadata {
  listennotes_url: string;
  id: string;
  title_highlighted: string;
  title_original: string;
  publisher_highlighted: string;
  publisher_original: string;
  image: string;
  thumbnail: string;
  genre_ids: number[];
  listen_score: string;
  listen_score_global_rank: string;
}
