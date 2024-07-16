# marvelFights

This app is built using the Maervel API to interact with their database of characters (Which is still in Beta). 
It also utilizes the power of OpenAI to create fictional Battle descriptions and create imagery of these battles. This app will continue to be iterated on to create a more well rounded user experience of bringing the debates of who would win into the digital realm.


## Getting Started

Clone this repo to your machine, and work out of the Dev Branch.

You will need to sign up for an account with [Marvel](https://developer.marvel.com/documentation/getting_started) to acquire a Personal and Public API key. As well as with [OpenAI](https://openai.com/index/chatgpt/).

Once you have acquired your keys, create your own .env file at the root level and store the acquired values with the variable names as follows :

- Private Key

MARVEL_API_KEY_PRIVATE= 'Enter your Marvel Private Key here'

- Public Key

MARVEL_API_KEY_PUBLIC= 'Enter your Marvel Public Key here'

- OpenAI Key

OPENAI_API_KEY='Enter your OpenAI key here'


## Firing it Up

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


To contribute to this repository, or any questions, feel free to reach out!
