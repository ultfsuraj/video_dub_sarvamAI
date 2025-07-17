import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/redux/Providers';

export const metadata: Metadata = {
  title: 'Sarvam AI : Video & Audio Dubbing Tool',
  description: 'Simple application to dub audio of a video into another language',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
