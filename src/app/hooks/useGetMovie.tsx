import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import {
  IMovieOrSeriesResponse,
  IMovieOrSeriesResponseData,
} from '../types/api/movieTypes';

const useFetchMovies = (movieTitle: string) => {
  const [movies, setMovies] = useState<IMovieOrSeriesResponseData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!movieTitle) return;

      const encodedTitle = encodeURIComponent(movieTitle);
      const options = {
        method: 'GET',
        url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${encodedTitle}`,
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
        },
        params: {
          info: 'base_info',
          limit: '50',
        },
      };

      setLoading(true);
      setError(null);

      try {
        const response = await axios.request<IMovieOrSeriesResponse>(options);
        const moviesData = response.data.results || [];
        const filteredMovies: IMovieOrSeriesResponseData[] = moviesData.filter(
          (movie) => movie.titleType.id === 'movie'
        );
        setMovies(filteredMovies);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movieTitle]);

  return { movies, loading, error };
};

export default useFetchMovies;
