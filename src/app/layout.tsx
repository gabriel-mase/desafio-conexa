import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rick & Morty Explorer',
  description: 'Explore characters and shared episodes from the Rick and Morty universe',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-portal-dark antialiased">{children}</body>
    </html>
  );
}
