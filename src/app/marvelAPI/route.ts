import dotenv from 'dotenv';
dotenv.config;

export async function GET() {
  const apiKey = process.env.MARVEL_API_KEY_PRIVATE;
  const publicKey = process.env.MARVEL_API_KEY_PUBLIC;

  const res = await fetch(``);
}
