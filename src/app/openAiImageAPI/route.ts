import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();
  console.log('bodyMessages: ', body.messages);
  const main = async () => {
    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt: body.messages,
      n: 1,
      size: '1024x1024',
    });

    //   const response = await openai.createImage({
    //     model: 'dall-e-3',
    //     prompt: 'a white siamese cat',
    //     n: 1,
    //     size: '1024x1024',
    //   });
    //   image_url = response.data.data[0].url;
    const theResponse = image.data[0].url;
    // console.log('theResponse :', theResponse);
    return theResponse;
  };
  const theResponse = await main();
  console.log('theResponse :', theResponse);
  //   async function main() {
  //     console.log(image.data);
  //   }
  //   main();

  //   const completion = await openai.chat.completions.create({
  //     model: 'gpt-3.5-turbo',
  //     messages: body.messages,
  //     temperature: 1,
  //     max_tokens: 256,
  //     top_p: 1,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  //   });
  //   console.log(completion.choices[0].message);
  //   const theResponse = completion.choices[0].message;

  return NextResponse.json({ output: theResponse }, { status: 200 });
}
