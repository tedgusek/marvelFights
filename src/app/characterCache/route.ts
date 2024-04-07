//  This will handle the routes to Redis

// 'use client';
import { NextApiRequest, NextApiResponse } from 'next';
import md5 from 'md5';
// import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { NextResponse, NextRequest } from 'next/server';
// import { useSearchParams } from 'next/navigation';
import { Character, Thumbnail, ErrorResponse } from '../types/interface';

// dotenv.config();

export async function GET(
  req: NextRequest,
  res: NextResponse
  // res: NextResponse<Character[] | ErrorResponse>
  // res: NextApiResponse<Character[] | ErrorResponse>
) {
  // Extract query parameters from the URL

  // const queryParams = useSearchParams();
  // let offset = queryParams.get('offset');
  // if (!offset) offset = '0';

  const query = req.url?.split('?')[1];

  const { offset = 0 } = query
    ? require('url').parse('?' + query, true).query
    : {}; // Parse the query string to get the offset

  const apiKey = process.env.MARVEL_API_KEY_PRIVATE;
  const publicKey = process.env.MARVEL_API_KEY_PUBLIC;

  try {
    const ts = new Date().getTime().toString();
    const hash = md5(ts + apiKey + publicKey);
    const limit = 100;

    const endpoint = `v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

    const res = await fetch(`http://gateway.marvel.com/${endpoint}`);

    if (res.ok) {
      const responseData: any = await res.json();

      const charactersArray: Character[] = responseData.data.results;

      return NextResponse.json(charactersArray, { status: 200 });
    }
    throw new Error('Failed to fetch Data from Marvel API');
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error here' });
  }
}
