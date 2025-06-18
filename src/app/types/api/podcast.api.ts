declare module 'podcast-api' {
  export interface SearchParams {
    q: string;
    sort_by_date?: number;
    type?: 'episode' | 'podcast';
    offset?: number;
    len_min?: number;
    len_max?: number;
    genre_ids?: string;
    published_before?: number;
    published_after?: number;
    only_in?: string;
    language?: string;
    safe_mode?: number;
    unique_podcasts?: number;
    page_size?: number;
  }

  export interface SearchResult {
    id: string;
    title: string;
    description: string;
    pub_date_ms: number;
    audio: string;
    audio_length_sec: number;
    listennotes_url: string;
    image: string;
    thumbnail: string;
    podcast: {
      id: string;
      title: string;
      publisher: string;
      image: string;
      thumbnail: string;
      listen_score: number;
    };
  }

  export interface SearchResponse {
    count: number;
    total: number;
    results: SearchResult[];
  }

  export interface ClientResponse {
    data: SearchResponse;
  }

  export interface ClientOptions {
    apiKey: string | undefined;
  }

  export function Client(options: ClientOptions): {
    search: (params: SearchParams) => Promise<ClientResponse>;
  };
}
