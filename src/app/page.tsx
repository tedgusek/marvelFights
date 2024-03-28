import Image from 'next/image';
import Link from 'next/link';

// For Now it is a link to the game page
// Will eventually be connected to a DB where users will be stored and high scores can be saved

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex flex-col items-center'>
        <h1 className='p-4'>Marvel Fights</h1>
        <Link
          className='bg-white rounded-lg border-4 border-gray-600 text-black px-4'
          href={'/game'}
        >
          Game
        </Link>
      </div>
    </main>
  );
}
