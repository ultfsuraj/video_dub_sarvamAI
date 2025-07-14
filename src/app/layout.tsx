import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sarvam AI : Video & Audio Dubbing Tool',
  description:
    'Simple application to dub audio of a video into another language',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
