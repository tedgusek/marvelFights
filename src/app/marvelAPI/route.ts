import { NextApiRequest, NextApiResponse } from 'next';
import md5 from 'md5';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { NextResponse, NextRequest } from 'next/server';
import { Character, Thumbnail, ErrorResponse } from '../types/interface';

dotenv.config();

// interface Thumbnail {
//   path: string;
//   extension: string;
// }

// interface Character {
//   name: string;
//   description: string;
//   thumbnail: Thumbnail;
// }

// interface ErrorResponse {
//   error: string;
// }

export async function GET(
  req: NextRequest,
  res: NextApiResponse<Character[] | ErrorResponse>
) {
  const query = req.url?.split('?')[1]; // Extract query parameters from the URL
  const { offset = 0 } = query
    ? require('url').parse('?' + query, true).query
    : {}; // Parse the query string to get the offset
  const apiKey = process.env.MARVEL_API_KEY_PRIVATE;
  const publicKey = process.env.MARVEL_API_KEY_PUBLIC;
  console.log('offset : ', offset);
  try {
    const ts = new Date().getTime().toString();
    const hash = md5(ts + apiKey + publicKey);
    const limit = 100;

    const endpoint = `v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

    const res = await fetch(`http://gateway.marvel.com/${endpoint}`);

    if (res.ok) {
      const responseData: any = await res.json();
      //   const responseData: any = await response.json();

      const charactersArray: Character[] = responseData.data.results;
      // const code: number = responseData.code;  // response code

      return Response.json(charactersArray);
      //   return res.status(200).json(charactersArray);
    }
    throw new Error('Failed to fetch Data from Marvel API');
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' });
  }
}
