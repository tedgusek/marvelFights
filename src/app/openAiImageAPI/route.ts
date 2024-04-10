import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  const prompt: string = `It is important to accurately depict each Marvel character.  It is extremely important to only create characters exclusively from the Marvel universe.  This is the descrtiption of the battle: ${body.messages}, create an image that depicts this scene clearly and in a comic book style. If you do not know the character, search for references. Do not include text in the image. Clearly show the vitor of the battle.`;

  const main = async () => {
    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    const theResponse = image.data[0].url;

    return theResponse;
  };
  const theResponse = await main();

  return NextResponse.json({ output: theResponse }, { status: 200 });
}
