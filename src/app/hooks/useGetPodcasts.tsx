import { Client, SearchResult } from 'podcast-api';
import { useState } from 'react';

const useGetPodcasts = () => {
  const [podcasts, setPodcasts] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPodcasts = async () => {
    try {
      setIsLoading(true);
      const client = Client({
        apiKey: process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY,
      });

      const response = await client.search({
        q: 'bipolar',
        type: 'episode',
        language: 'English',
        page_size: 30,
        offset: 10,
      });

      setPodcasts(response.data.results);
      setIsLoading(false);
      return response.data.results;
    } catch (error) {
      console.error('Kunde inte hämta podcasts:', error);
      setIsLoading(false);
    }
  };

  return { podcasts, isLoading, getPodcasts };
};

export default useGetPodcasts;
