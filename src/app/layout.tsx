import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Breadcrumbs from './components/Breadcrumbs';
import ChatWrapper from './components/chat/ChatWrapper';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { schemaMarkup } from './data/seo/schemaMarkup';
import { Providers } from './providers/Providers';
import './styles/styles.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.xn--bipolrkompassen-4kb.se'),
  title: 'Bipolärkompassen - Din Guide till Bipolaritet och Mental Hälsa',
  description:
    'Utforska Bipolärkompassen, en omfattande resurs för att förstå och hantera bipolaritet. Innehåller AI-assistenten Bipo, moodtracker, dagbok, forskning, multimedia, och akut hjälplinjer.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  keywords: [
    'bipolaritet',
    'bipolär sjukdom',
    'maniskt tillstånd',
    'mental hälsa',
    'AI-assistent Bipo',
    'moodtracker',
    'dagbok för bipolaritet',
    'forskningsartiklar om bipolaritet',
    'multimedia för mental hälsa',
    'Spotify mental hälsa',
    'självbedömning mental hälsa',
    'akut hjälplinjer Sverige',
    'anhöriga och bipolaritet',
    'diagnoser och behandling',
  ].join(', '),
  openGraph: {
    title: 'Bipolärkompassen - Din Guide till Bipolaritet och Mental Hälsa',
    description:
      'Utforska Bipolärkompassen, en omfattande resurs för att förstå och hantera bipolaritet. Innehåller AI-assistenten Bipo, moodtracker, dagbok, forskning, multimedia, och akut hjälplinjer.',
    url: 'https://www.xn--bipolrkompassen-4kb.se/',
    type: 'website',
    images: [
      {
        url: '/assets/icons/compass.svg',
        alt: 'Bipolärkompassen thumbnail',
      },
    ],
  },
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${inter.variable} ${playfair.variable}`}>
      <body className="h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        <Providers>
          <Header />
          <div className="main-container flex flex-col h-full min-h-screen">
            <Breadcrumbs />
            <main className="flex flex-1 justify-center w-full">
              {children}
            </main>
          </div>
          <Footer />
          <ChatWrapper />
        </Providers>
      </body>
    </html>
  );
}
