import Image from 'next/image';
import React from 'react';
import SpotifyIcon from '../../../../assets/icons/spotify.svg';

interface AuthButtonProps {
  isAuthenticated: boolean;
  onLogout?: () => void;
}

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirect_uri = encodeURIComponent(
  process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || ''
);
const scope = encodeURIComponent('streaming user-read-email user-read-private');
const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`;

const AuthButton: React.FC<AuthButtonProps> = ({
  isAuthenticated,
  onLogout,
}) => {
  const handleLogin = () => {
    window.location.href = spotifyAuthUrl;
  };

  return (
    <button
      onClick={isAuthenticated ? onLogout : handleLogin}
      className="flex items-center gap-3 bg-[#1DB954] hover:bg-[#1ed760] text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
    >
      <Image src={SpotifyIcon} alt="Spotify" width="24" height="24" />
      <span className="font-medium">
        {isAuthenticated ? 'Logga ut' : 'Logga in med Spotify'}
      </span>
    </button>
  );
};

export default AuthButton;
