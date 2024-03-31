import { NextApiRequest, NextApiResponse } from 'next';
import md5 from 'md5';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { NextResponse, NextRequest } from 'next/server';

dotenv.config();

interface Thumbnail {
  path: string;
  extension: string;
}

interface Character {
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

interface ErrorResponse {
  error: string;
}

export async function GET() {
  //   error: any,
  //   req: NextRequest,
  //   res: NextApiResponse<Character[] | ErrorResponse>
  const apiKey = process.env.MARVEL_API_KEY_PRIVATE;
  const publicKey = process.env.MARVEL_API_KEY_PUBLIC;

  try {
    const ts = new Date().getTime().toString();
    const hash = md5(ts + apiKey + publicKey);
    const limit = 100;

    const endpoint = `v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}`;

    const res = await fetch(`http://gateway.marvel.com/${endpoint}`);
    // console.log('response : ', response);
    //   const charactersArray: Character[] = response.data.data.results;
    if (res.ok) {
      const responseData: any = await res.json();

      const charactersArray: Character[] = responseData.data.results;
      // console.log('charactersArray : ', charactersArray);
      // return res.status(200).json(charactersArray);

      // return res.status(200).json(charactersArray);
      return Response.json(charactersArray);
    }
    throw new Error('Failed to fetch Data from Marvel API');
  } catch (error) {
    // console.error(`Error retrieving Characters : ${error}`);
    // return res.status(500).json({ error: 'Internal Server Error' });
    return Response.json({ error: 'Internal Server Error' });
  }
}
