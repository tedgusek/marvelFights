import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GameLayout from './game/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marvel Fights',
  description: 'An AI fueled Marvel Game',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
