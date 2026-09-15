import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import GlobalMusicPlayer from '@/components/global-music-player';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Our Connection ✨ | Since Sept 02, 2026',
  description:
    'A collection of conversations, moments, and memories shared between us. Explore our journey through chats, voice calls, and special surprises.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#ff1493',
    },
  ],
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} bg-background`}>
      <body className="font-poppins antialiased">
        <GlobalMusicPlayer />

        {children}

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}