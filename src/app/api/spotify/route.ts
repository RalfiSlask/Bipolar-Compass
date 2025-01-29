import { NextRequest, NextResponse } from 'next/server';

/**
 * This route is used to exchange the spotify code for an access token.
 * @param {NextRequest} req - The request object which contains the code.
 * @returns {NextResponse} Response object with success or error.
 */
export const POST = async (req: NextRequest) => {
  const { code } = await req.json();

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri =
    'https://www.xn--bipolrkompassen-4kb.se/multimedia/musik';

  if (!client_id || !client_secret || !redirect_uri) {
    console.error('Missing environment variables:', {
      hasClientId: !!client_id,
      hasClientSecret: !!client_secret,
      redirectUri: redirect_uri,
    });
    return NextResponse.json(
      { error: 'Missing environment variables' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirect_uri,
      }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Spotify API error:', data);
      return NextResponse.json(data, { status: response.status });
    }

    const res = NextResponse.json(data);

    if (process.env.NODE_ENV === 'development') {
      res.cookies.set('spotify_token', data.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 3600,
      });
    } else if (process.env.NODE_ENV === 'production') {
      res.cookies.set('spotify_token', data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 3600,
      });
    }

    return res;
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json(
      { error: 'Failed to exchange token' },
      { status: 500 }
    );
  }
};
