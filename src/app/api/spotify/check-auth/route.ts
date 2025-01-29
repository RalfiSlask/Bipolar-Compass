import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * This route is used to check if the user is authenticated with spotify.
 * @returns {NextResponse} Response object with success or error.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const spotifyToken = cookieStore.get('spotify_token');

    if (!spotifyToken) {
      return NextResponse.json({ isAuthenticated: false });
    }

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${spotifyToken.value}`,
      },
    });

    if (response.ok) {
      return NextResponse.json({
        isAuthenticated: true,
        access_token: spotifyToken.value,
      });
    } else {
      return NextResponse.json({ isAuthenticated: false });
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ isAuthenticated: false });
  }
}
