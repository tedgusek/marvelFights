// import { Response } from 'express';
import { NextApiRequest, NextApiResponse } from 'next';
import md5 from 'md5';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

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

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Character[] | ErrorResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not Allowed' });
  }

  const apiKey = process.env.MARVEL_API_KEY_PRIVATE;
  const publicKey = process.env.MARVEL_API_KEY_PUBLIC;

  try {
    const ts = new Date().getTime().toString();
    const hash = md5(ts + apiKey + publicKey);

    const endpoint = `v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    const response = await fetch(`http://gateway.marvel.com/${endpoint}`);
    console.log('response : ', response);
    //   const charactersArray: Character[] = response.data.data.results;
    if (!response.ok) {
      throw new Error('Failed to fetch Data from Marvel API');
    }

    const responseData: any = await response.json();
    const charactersArray: Character[] = responseData.data.results;

    return res.status(200).json(charactersArray);
  } catch (error) {
    console.error(`Error retrieving Characters : ${error}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
