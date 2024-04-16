import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  //   const prompt: string = `It is important to accurately depict each Marvel character as they are in the comics.  It is extremely important to only create characters exclusively from the Marvel universe.  This is the descrtiption of the battle: ${body.messages}, create an image that depicts this scene clearly and in a comic book style. If you do not know the character, search for references and make them accordingly. It is imperative to never include text in the images under any circumstances.`;
  const prompt: string = `Generate a single image of an epic battle scene featuring specific characters without any text included. Please include ${body.messages.playerName} and ${body.messages.compName} engaging in combat. The scene should depict ${body.messages.description}. Ensure that the images capture the intensity and dynamism of the battle. Use vibrant colors and detailed textures to bring the scene to life.
  `;

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
