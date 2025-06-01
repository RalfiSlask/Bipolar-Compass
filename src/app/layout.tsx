import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import Breadcrumbs from './components/Breadcrumbs';
import ChatWrapper from './components/chat/ChatWrapper';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { schemaMarkup } from './data/seo/schemaMarkup';
import { Providers } from './providers/Providers';
import './styles/styles.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.xn--bipolrkompassen-4kb.se'),
  title: {
    default: 'Bipolärkompassen - Din Guide till Bipolaritet och Mental Hälsa',
    template: '%s | Bipolärkompassen',
  },
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
    'moodtracker',
    'dagbok för bipolaritet',
    'forskning bipolaritet',
    'bipolar',
    'bipolär',
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
        url: '/assets/images/opengraph-image.png',
        alt: 'Bipolärkompassen thumbnail',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.xn--bipolrkompassen-4kb.se',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'DY-P4TH1lOm3lXPh4FEYhwGFJtY6kfSueYq05QhhZfQ',
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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2L0NHL68ND"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2L0NHL68ND');
          `}
        </Script>
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
