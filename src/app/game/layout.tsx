import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '../components/navbar/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Battle Ground',
  description:
    'Choose your Marvel character to battle the computer generated Character',
};

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='fixed top-8 right-12 bg-inherit'>
          <NavBar />
        </div>
        <div className='flex flex-col items-center mt-40'>{children}</div>
        <div className='bottom-2 fixed bg-inherit '>
          Data Provided by Marvel. © 2024 Marvel
        </div>
      </body>
    </html>
  );
}
