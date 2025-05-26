'use client';

import { isAxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import AuthButton from './AuthButton';
const spotifyApi = new SpotifyWebApi();

interface ISpotifySectionProps {
  activePlaylist: { id: string; title: string }[];
}

const SpotifySection = ({ activePlaylist }: ISpotifySectionProps) => {
  const searchParams = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [attemptedExchange, setAttemptedExchange] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/spotify/check-auth');
        const data = await response.json();

        if (data.isAuthenticated) {
          spotifyApi.setAccessToken(data.access_token);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const code = searchParams?.get('code');
    if (code && !attemptedExchange) {
      setAttemptedExchange(true);
      exchangeCodeForToken(code);
    }
  }, [searchParams]);

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch('/api/spotify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (data.access_token) {
        spotifyApi.setAccessToken(data.access_token);
        setIsAuthenticated(true);
        window.history.replaceState(null, '', location.pathname);
      } else {
        console.error('No access token in response:', data);
        throw new Error('Failed to obtain access token');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.error('Detailed exchange error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/spotify/logout', { method: 'POST' });
      setIsAuthenticated(false);
      spotifyApi.setAccessToken('');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <article className="w-full">
      <div className="bg-gradient-to-br from-primary-light to-primary-dark shadow-xl p-4 md:p-8 rounded-3xl">
        {!isAuthenticated && (
          <div className="mb-8 p-6 bg-primary-dark backdrop-blur-sm rounded-2xl border border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-white text-xl font-semibold">
                  Få ut mer av din musikupplevelse
                </h3>
                <p className="text-gray-300">
                  Logga in med Spotify för att kunna spela och kontrollera
                  musiken direkt här på sidan
                </p>
              </div>
              <AuthButton
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {activePlaylist.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-primary-dark backdrop-blur-sm sm:p-6 rounded-2xl shadow-inner sm:border sm:border-gray-700"
            >
              <h3 className="hidden sm:block text-white text-xl font-semibold mb-4">
                {playlist.title}
              </h3>
              <div className="overflow-hidden rounded-xl shadow-lg sm:aspect-[4/3]">
                <iframe
                  src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator`}
                  width="100%"
                  height="100%"
                  title={`playlist with id: ${playlist.id}`}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="hover:opacity-95 transition-opacity min-h-[450px] sm:min-h-[352px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default SpotifySection;
