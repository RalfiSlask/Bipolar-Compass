'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MediumImageWithText } from '../components/shared/MediumImageWithText';

// Infobox/Alert
const InfoBox = () => (
  <div className="bg-tertiary-light border-l-4 border-tertiary-dark p-4 mb-8">
    <p className="text-tertiary-dark font-medium">
      Viktigt: Kontakta alltid 112 vid akuta nödsituationer.
    </p>
  </div>
);

// Myndighetskort - Standard
const authorities = [
  {
    name: 'Socialstyrelsen',
    description:
      'Nationell kunskapsmyndighet för socialtjänst, hälso- och sjukvård.',
    url: 'https://www.socialstyrelsen.se/',
  },
  {
    name: 'Försäkringskassan',
    description: 'Ansvarar för stora delar av socialförsäkringen.',
    url: 'https://www.forsakringskassan.se/',
  },
  {
    name: 'Arbetsförmedlingen',
    description: 'Hjälper arbetssökande och arbetsgivare att hitta varandra.',
    url: 'https://www.arbetsformedlingen.se/',
  },
  {
    name: 'Migrationsverket',
    description: 'Myndighet för migration och asyl.',
    url: 'https://www.migrationsverket.se/',
  },
];

const AuthoritiesGrid = () => (
  <section className="mb-10">
    <h2 className="text-xl font-semibold text-primary-dark mb-4">
      Exempel på myndigheter
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {authorities.map((auth) => (
        <a
          key={auth.name}
          href={auth.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white border border-primary-border rounded-lg shadow hover:shadow-lg transition p-5 h-full"
        >
          <h3 className="text-lg font-bold text-primary-accent mb-1">
            {auth.name}
          </h3>
          <p className="text-gray-700 mb-2">{auth.description}</p>
          <span className="text-sm text-primary-dark underline">
            Besök webbplats
          </span>
        </a>
      ))}
    </div>
  </section>
);

// Myndighetskort - Med bild och färgaccent
const AuthoritiesImageCards = () => (
  <section className="mb-10">
    <h2 className="text-xl font-semibold text-tertiary-dark mb-4">
      Myndigheter med bild
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {authorities.map((auth) => (
        <div
          key={auth.name}
          className="bg-tertiary-light border border-tertiary-dark rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
        >
          <Image
            src="/images/bipolar/bipolarity.webp"
            alt={auth.name}
            width={400}
            height={200}
            className="w-full h-32 object-cover"
          />
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-tertiary-dark mb-1">
              {auth.name}
            </h3>
            <p className="text-gray-700 mb-2 flex-1">{auth.description}</p>
            <a
              href={auth.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-tertiary-dark underline font-medium"
            >
              Besök webbplats
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// Feature Highlights
const FeatureHighlights = () => (
  <section className="mb-12">
    <h2 className="text-xl font-semibold text-primary-dark mb-4">
      Vad kan myndigheterna hjälpa till med?
    </h2>
    <div className="flex flex-wrap gap-6">
      <div className="flex-1 min-w-[220px] bg-primary-accent text-white rounded-lg p-6 shadow">
        <h3 className="font-bold text-lg mb-2">Stöd & Råd</h3>
        <p>Få vägledning i svåra situationer.</p>
      </div>
      <div className="flex-1 min-w-[220px] bg-secondary-light text-secondary-dark rounded-lg p-6 shadow">
        <h3 className="font-bold text-lg mb-2">Ekonomisk hjälp</h3>
        <p>Information om bidrag och ersättningar.</p>
      </div>
      <div className="flex-1 min-w-[220px] bg-tertiary-dark text-tertiary-light rounded-lg p-6 shadow">
        <h3 className="font-bold text-lg mb-2">Rättigheter</h3>
        <p>Lär dig om dina rättigheter i samhället.</p>
      </div>
    </div>
  </section>
);

// Side-by-side Info
const SideBySideInfo = () => (
  <section className="mb-12 flex flex-col md:flex-row gap-8 items-center">
    <div className="flex-1 bg-secondary-dark text-white rounded-lg p-8 shadow-lg">
      <h3 className="text-2xl font-bold mb-2">Snabbfakta</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>1177 ger sjukvårdsrådgivning dygnet runt</li>
        <li>Socialstyrelsen har öppet data om vård</li>
        <li>Arbetsförmedlingen hjälper till med jobb</li>
      </ul>
    </div>
    <div className="flex-1 flex justify-center">
      <Image
        src="/images/bipolar/bipolarity.webp"
        alt="Fakta"
        width={220}
        height={220}
        className="rounded-xl border-4 border-secondary-light shadow"
      />
    </div>
  </section>
);

// Vertical Timeline
const Timeline = () => (
  <section className="mb-12">
    <h2 className="text-xl font-semibold text-primary-dark mb-4">
      Viktiga steg
    </h2>
    <div className="relative border-l-4 border-primary-accent pl-8 space-y-8">
      <div className="relative">
        <div className="absolute -left-5 top-1 w-4 h-4 bg-primary-accent rounded-full border-2 border-white"></div>
        <h4 className="font-bold text-primary-accent">Kontakta myndighet</h4>
        <p className="text-gray-700">
          Börja med att identifiera vilken myndighet som är relevant för ditt
          ärende.
        </p>
      </div>
      <div className="relative">
        <div className="absolute -left-5 top-1 w-4 h-4 bg-secondary-dark rounded-full border-2 border-white"></div>
        <h4 className="font-bold text-secondary-dark">Samla dokument</h4>
        <p className="text-gray-700">
          Förbered nödvändiga handlingar och information.
        </p>
      </div>
      <div className="relative">
        <div className="absolute -left-5 top-1 w-4 h-4 bg-tertiary-dark rounded-full border-2 border-white"></div>
        <h4 className="font-bold text-tertiary-dark">Följ upp</h4>
        <p className="text-gray-700">
          Följ upp ditt ärende och spara all korrespondens.
        </p>
      </div>
    </div>
  </section>
);

// Statistik/Numbers
const Statistics = () => (
  <section className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
    <div className="bg-primary-accent text-white rounded-lg p-8 text-center shadow">
      <div className="text-3xl font-bold mb-2">290</div>
      <div>Kommuner i Sverige</div>
    </div>
    <div className="bg-secondary-light text-secondary-dark rounded-lg p-8 text-center shadow">
      <div className="text-3xl font-bold mb-2">21</div>
      <div>Regioner</div>
    </div>
    <div className="bg-tertiary-dark text-tertiary-light rounded-lg p-8 text-center shadow">
      <div className="text-3xl font-bold mb-2">100+</div>
      <div>Statliga myndigheter</div>
    </div>
  </section>
);

// Callout/Highlight
const Callout = () => (
  <div className="bg-primary-dark text-primary-light rounded-xl p-6 mb-12 shadow-lg flex items-center gap-4">
    <Image
      src="/images/bipolar/bipolarity.webp"
      alt="Callout"
      width={60}
      height={60}
      className="rounded-full border-2 border-primary-light"
    />
    <div>
      <div className="font-bold text-lg">Tips!</div>
      <div>
        Besök{' '}
        <a
          href="https://www.krisinformation.se/"
          className="underline text-primary-accent"
        >
          Krisinformation.se
        </a>{' '}
        för samlad information vid samhällskriser.
      </div>
    </div>
  </div>
);

// Carousel (statisk)
const Carousel = () => (
  <section className="mb-12">
    <h2 className="text-xl font-semibold text-primary-dark mb-4">
      Myndigheter i fokus
    </h2>
    <div className="flex gap-6 overflow-x-auto pb-2">
      {authorities.map((auth) => (
        <div
          key={auth.name}
          className="min-w-[260px] bg-white border border-primary-border rounded-lg shadow p-4 flex flex-col items-center"
        >
          <Image
            src="/images/bipolar/bipolarity.webp"
            alt={auth.name}
            width={80}
            height={80}
            className="rounded-full mb-2 border-2 border-primary-accent"
          />
          <h3 className="text-lg font-bold text-primary-accent mb-1">
            {auth.name}
          </h3>
          <p className="text-gray-700 text-center mb-2">{auth.description}</p>
          <a
            href={auth.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-dark underline"
          >
            Besök webbplats
          </a>
        </div>
      ))}
    </div>
  </section>
);

// Kontaktsektion
const ContactSection = () => (
  <section className="bg-secondary-light rounded-lg p-6 mt-10">
    <h2 className="text-lg font-semibold text-secondary-dark mb-2">
      Behöver du mer hjälp?
    </h2>
    <p className="text-gray-700 mb-2">
      Besök{' '}
      <a
        href="https://www.krisinformation.se/"
        className="text-primary-accent underline"
      >
        Krisinformation.se
      </a>{' '}
      för samlad information vid samhällskriser.
    </p>
    <p className="text-gray-700">
      Du kan också kontakta{' '}
      <span className="font-semibold text-primary-dark">1177 Vårdguiden</span>{' '}
      för sjukvårdsrådgivning.
    </p>
  </section>
);

// Sticky Info Bar
const StickyInfoBar = () => (
  <div className="sticky top-0 z-50 bg-primary-accent text-white py-3 px-6 shadow-lg flex justify-between items-center mb-12">
    <span className="font-semibold">
      Snabbinfo: 1177 ger sjukvårdsrådgivning dygnet runt
    </span>
    <span className="bg-tertiary-light text-tertiary-dark px-3 py-1 rounded-full font-bold text-xs">
      Akut: 112
    </span>
  </div>
);

// Glassmorphism Card
const GlassCard = () => (
  <div className="relative bg-white/30 backdrop-blur-md border border-primary-border rounded-2xl shadow-lg p-8 mb-12 max-w-md mx-auto">
    <Image
      src="/images/bipolar/bipolarity.webp"
      alt="Glass"
      width={80}
      height={80}
      className="rounded-full border-4 border-primary-accent mb-4 mx-auto"
    />
    <h3 className="text-xl font-bold text-primary-dark mb-2 text-center">
      Glassmorphism
    </h3>
    <p className="text-gray-700 text-center">
      Modern designtrend med genomskinliga kort och softa skuggor.
    </p>
  </div>
);

// Floating Cards
const FloatingCards = () => (
  <section className="mb-12 relative h-72">
    <h2 className="text-xl font-semibold text-primary-dark mb-4">
      Floating Cards
    </h2>
    <div className="absolute left-10 top-10 w-60 h-40 bg-secondary-light rounded-xl shadow-2xl p-6 z-10 border-2 border-secondary-dark hover:scale-105 transition-transform">
      Info 1
    </div>
    <div className="absolute left-40 top-24 w-60 h-40 bg-tertiary-light rounded-xl shadow-2xl p-6 z-20 border-2 border-tertiary-dark hover:scale-105 transition-transform">
      Info 2
    </div>
    <div className="absolute left-72 top-4 w-60 h-40 bg-primary-accent text-white rounded-xl shadow-2xl p-6 z-30 border-2 border-primary-dark hover:scale-105 transition-transform">
      Info 3
    </div>
  </section>
);

// Ribbon Card
const RibbonCard = () => (
  <div className="relative bg-white border border-primary-border rounded-xl shadow-lg p-6 mb-12 max-w-md mx-auto">
    <div className="absolute -top-3 -left-3 bg-primary-accent text-white px-4 py-1 rounded-br-xl rounded-tl-xl font-bold text-xs shadow">
      NYHET
    </div>
    <h3 className="text-lg font-bold text-primary-dark mb-2">Ribbon Card</h3>
    <p className="text-gray-700">Kort med &quot;ribbon&quot;-märke i hörnet.</p>
  </div>
);

// Badge Row
const BadgeRow = () => (
  <div className="flex gap-3 flex-wrap mb-12 justify-center">
    <span className="bg-primary-accent text-white px-3 py-1 rounded-full text-xs font-bold">
      Statlig
    </span>
    <span className="bg-secondary-light text-secondary-dark px-3 py-1 rounded-full text-xs font-bold">
      Kommunal
    </span>
    <span className="bg-tertiary-dark text-tertiary-light px-3 py-1 rounded-full text-xs font-bold">
      Vård
    </span>
    <span className="bg-primary-dark text-primary-light px-3 py-1 rounded-full text-xs font-bold">
      Stöd
    </span>
  </div>
);

// Tabbar
const Tabbar = () => {
  const [tab, setTab] = useState(0);
  return (
    <div className="mb-12">
      <div className="flex gap-2 bg-primary-light rounded-lg p-2 w-fit mx-auto">
        {['Alla', 'Statliga', 'Kommunala', 'Vård'].map((label, idx) => (
          <button
            key={label}
            onClick={() => setTab(idx)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              tab === idx
                ? 'bg-primary-accent text-white'
                : 'text-primary-dark hover:bg-primary-border'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-4 text-center text-primary-dark">
        {tab === 0 && 'Alla myndigheter visas här.'}
        {tab === 1 && 'Endast statliga myndigheter.'}
        {tab === 2 && 'Endast kommunala myndigheter.'}
        {tab === 3 && 'Endast vårdrelaterade myndigheter.'}
      </div>
    </div>
  );
};

// Masonry Grid
const MasonryGrid = () => (
  <section className="mb-12">
    <h2 className="text-xl font-semibold text-primary-dark mb-4">
      Masonry Grid
    </h2>
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div
          key={n}
          className="break-inside-avoid bg-secondary-light rounded-xl shadow p-4 mb-4"
        >
          <Image
            src="/images/bipolar/bipolarity.webp"
            alt={`Bild ${n}`}
            width={300}
            height={120}
            className="rounded-lg mb-2"
          />
          <div className="font-bold text-secondary-dark mb-1">
            Myndighet {n}
          </div>
          <div className="text-gray-700">
            Exempel på masonry grid med varierande innehåll och höjd.
          </div>
        </div>
      ))}
    </div>
  </section>
);

// Media Highlight
const MediaHighlight = () => (
  <section className="mb-12 flex flex-col md:flex-row gap-8 items-center bg-tertiary-light rounded-xl p-8 shadow-lg">
    <Image
      src="/images/bipolar/bipolarity.webp"
      alt="Media"
      width={180}
      height={180}
      className="rounded-xl border-4 border-tertiary-dark"
    />
    <div>
      <h3 className="text-2xl font-bold text-tertiary-dark mb-2">
        Se vår informationsfilm
      </h3>
      <p className="text-gray-700 mb-2">
        Lär dig mer om hur myndigheter kan hjälpa dig i olika situationer.
      </p>
      <button className="bg-tertiary-dark text-tertiary-light px-6 py-2 rounded-lg font-semibold shadow hover:bg-tertiary-medium transition">
        Spela upp film
      </button>
    </div>
  </section>
);

// Parallax Section (simulerad)
const ParallaxSection = () => (
  <section className="mb-12 relative h-64 overflow-hidden rounded-xl shadow-lg">
    <div
      className="absolute inset-0 bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: 'url(/images/bipolar/bipolarity.webp)',
        filter: 'blur(2px) brightness(0.7)',
      }}
    ></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
      <h2 className="text-3xl font-bold mb-2">Parallax Effekt</h2>
      <p className="text-lg">Bakgrunden rör sig långsammare än förgrunden.</p>
    </div>
  </section>
);

// Overlay Card
const OverlayCard = () => (
  <div className="relative mb-12 max-w-md mx-auto">
    <Image
      src="/images/bipolar/bipolarity.webp"
      alt="Overlay"
      width={400}
      height={180}
      className="rounded-xl"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent rounded-xl flex flex-col justify-end p-6">
      <div className="text-white text-xl font-bold mb-1">Overlay Card</div>
      <div className="text-primary-light">
        Text ovanpå bild med gradient-overlay.
      </div>
    </div>
  </div>
);

// Info Popover (statisk)
const InfoPopover = () => (
  <div className="relative mb-12 max-w-xs mx-auto">
    <button className="bg-primary-accent text-white px-4 py-2 rounded-lg font-bold shadow">
      Info
    </button>
    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-primary-border rounded-xl shadow-lg p-4 z-20">
      <div className="font-bold text-primary-accent mb-1">
        Vad är en myndighet?
      </div>
      <div className="text-gray-700 text-sm">
        En myndighet är en organisation som styrs av staten, region eller kommun
        och har ansvar för olika samhällsfunktioner.
      </div>
    </div>
  </div>
);

// Tag Cloud
const TagCloud = () => (
  <div className="flex flex-wrap gap-2 mb-12 justify-center">
    {[
      'Socialstyrelsen',
      'Försäkringskassan',
      'Arbetsförmedlingen',
      'Migrationsverket',
      '1177',
      'Krisinfo',
      'Stöd',
      'Vård',
      'Ekonomi',
      'Rättigheter',
    ].map((tag) => (
      <span
        key={tag}
        className="bg-primary-light text-primary-dark px-3 py-1 rounded-full text-xs font-semibold shadow"
      >
        {tag}
      </span>
    ))}
  </div>
);

// Progress Circle (statisk)
const ProgressCircle = ({ percent }: { percent: number }) => (
  <div className="relative w-24 h-24 mb-12 mx-auto">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#d1d5db"
        strokeWidth="10"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#46737c"
        strokeWidth="10"
        fill="none"
        strokeDasharray="282.6"
        strokeDashoffset={282.6 - (282.6 * percent) / 100}
        strokeLinecap="round"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-primary-dark font-bold text-xl">
      {percent}%
    </div>
  </div>
);

// Stat Cards
const StatCards = () => (
  <section className="mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    <div className="bg-primary-accent text-white rounded-xl p-6 shadow text-center">
      <div className="text-4xl font-bold mb-2">98%</div>
      <div>Av myndigheter har e-tjänster</div>
    </div>
    <div className="bg-secondary-light text-secondary-dark rounded-xl p-6 shadow text-center">
      <div className="text-4xl font-bold mb-2">24/7</div>
      <div>Vissa tjänster öppna dygnet runt</div>
    </div>
    <div className="bg-tertiary-dark text-tertiary-light rounded-xl p-6 shadow text-center">
      <div className="text-4xl font-bold mb-2">+100</div>
      <div>Statliga myndigheter</div>
    </div>
    <div className="bg-primary-dark text-primary-light rounded-xl p-6 shadow text-center">
      <div className="text-4xl font-bold mb-2">290</div>
      <div>Kommuner</div>
    </div>
  </section>
);

// Comparison Cards
const ComparisonCards = () => (
  <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-white border-2 border-primary-accent rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-primary-accent mb-2">
        Statlig myndighet
      </h3>
      <ul className="list-disc pl-5 text-gray-700 mb-2">
        <li>Styrs av staten</li>
        <li>Nationellt ansvar</li>
        <li>Ex: Socialstyrelsen</li>
      </ul>
    </div>
    <div className="bg-white border-2 border-secondary-dark rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-secondary-dark mb-2">
        Kommunal myndighet
      </h3>
      <ul className="list-disc pl-5 text-gray-700 mb-2">
        <li>Styrs av kommunen</li>
        <li>Lokalt ansvar</li>
        <li>Ex: Socialtjänsten</li>
      </ul>
    </div>
  </section>
);

// Informationsblock
const InfoBlocks = () => (
  <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-white border-l-4 border-primary-accent rounded-xl p-6 shadow">
      <h3 className="font-bold text-primary-accent mb-2">
        Vad är en myndighet?
      </h3>
      <p className="text-gray-700">
        En myndighet är en organisation som styrs av staten, region eller kommun
        och har ansvar för olika samhällsfunktioner.
      </p>
    </div>
    <div className="bg-white border-l-4 border-secondary-dark rounded-xl p-6 shadow">
      <h3 className="font-bold text-secondary-dark mb-2">
        Hur kan myndigheter hjälpa dig?
      </h3>
      <p className="text-gray-700">
        Myndigheter kan ge stöd, information, vägledning och ibland ekonomisk
        hjälp beroende på ditt behov.
      </p>
    </div>
  </section>
);

// Länksamling
const LinkCollection = () => (
  <section className="mb-12">
    <h2 className="text-xl font-semibold text-primary-dark mb-4">
      Andra viktiga länkar
    </h2>
    <ul className="flex flex-wrap gap-4">
      <li>
        <a
          href="https://www.1177.se/"
          className="text-primary-accent underline font-medium"
        >
          1177 Vårdguiden
        </a>
      </li>
      <li>
        <a
          href="https://www.krisinformation.se/"
          className="text-primary-accent underline font-medium"
        >
          Krisinformation.se
        </a>
      </li>
      <li>
        <a
          href="https://www.forsakringskassan.se/"
          className="text-primary-accent underline font-medium"
        >
          Försäkringskassan
        </a>
      </li>
      <li>
        <a
          href="https://www.socialstyrelsen.se/"
          className="text-primary-accent underline font-medium"
        >
          Socialstyrelsen
        </a>
      </li>
      <li>
        <a
          href="https://www.arbetsformedlingen.se/"
          className="text-primary-accent underline font-medium"
        >
          Arbetsförmedlingen
        </a>
      </li>
    </ul>
  </section>
);

// Viktiga datum
const ImportantDates = () => (
  <section className="mb-12">
    <h2 className="text-xl font-semibold text-primary-dark mb-4">
      Viktiga datum
    </h2>
    <ul className="bg-secondary-light rounded-xl p-6 space-y-2">
      <li>
        <span className="font-bold text-secondary-dark">15 mars 2024:</span>{' '}
        Sista dag för ansökan om stöd
      </li>
      <li>
        <span className="font-bold text-secondary-dark">1 april 2024:</span> Ny
        e-tjänst lanseras
      </li>
      <li>
        <span className="font-bold text-secondary-dark">30 juni 2024:</span>{' '}
        Uppdatering av riktlinjer
      </li>
    </ul>
  </section>
);

// Info Timeline
const InfoTimeline = () => (
  <section className="mb-12">
    <h2 className="text-xl font-semibold text-primary-dark mb-4">
      Så här går det till
    </h2>
    <ol className="relative border-l-4 border-primary-accent pl-8 space-y-8">
      <li className="relative">
        <div className="absolute -left-5 top-1 w-4 h-4 bg-primary-accent rounded-full border-2 border-white"></div>
        <div className="font-bold text-primary-accent">
          1. Kontakta myndighet
        </div>
        <div className="text-gray-700">
          Börja med att identifiera vilken myndighet som är relevant för ditt
          ärende.
        </div>
      </li>
      <li className="relative">
        <div className="absolute -left-5 top-1 w-4 h-4 bg-secondary-dark rounded-full border-2 border-white"></div>
        <div className="font-bold text-secondary-dark">2. Skicka in ärende</div>
        <div className="text-gray-700">
          Fyll i nödvändiga uppgifter och skicka in din ansökan.
        </div>
      </li>
      <li className="relative">
        <div className="absolute -left-5 top-1 w-4 h-4 bg-tertiary-dark rounded-full border-2 border-white"></div>
        <div className="font-bold text-tertiary-dark">3. Få återkoppling</div>
        <div className="text-gray-700">
          Myndigheten återkopplar och hjälper dig vidare.
        </div>
      </li>
    </ol>
  </section>
);

// Map Section (statisk)
const MapSection = () => (
  <section className="mb-12 flex flex-col md:flex-row gap-8 items-center">
    <div className="flex-1">
      <h3 className="text-xl font-bold text-primary-dark mb-2">
        Hitta till oss
      </h3>
      <div className="text-gray-700 mb-2">
        Vår huvudkontor ligger centralt i Stockholm.
      </div>
      <div className="text-primary-accent font-semibold">
        Sveavägen 123, 113 50 Stockholm
      </div>
    </div>
    <div className="flex-1 flex justify-center">
      <Image
        src="/images/bipolar/bipolarity.webp"
        alt="Karta"
        width={220}
        height={120}
        className="rounded-xl border-4 border-primary-accent shadow"
      />
    </div>
  </section>
);

// Address Card
const AddressCard = () => (
  <div className="bg-secondary-light border-l-4 border-secondary-dark rounded-xl p-6 mb-12 max-w-md mx-auto">
    <div className="font-bold text-secondary-dark mb-1">Besöksadress</div>
    <div className="text-gray-700">Sveavägen 123, 113 50 Stockholm</div>
    <div className="text-primary-accent text-sm">info@myndighet.se</div>
  </div>
);

// Opening Hours
const OpeningHours = () => (
  <div className="bg-tertiary-light border-l-4 border-tertiary-dark rounded-xl p-6 mb-12 max-w-md mx-auto">
    <div className="font-bold text-tertiary-dark mb-1">Öppettider</div>
    <div className="text-gray-700">Mån-Fre: 08:00 - 17:00</div>
    <div className="text-gray-700">Lör-Sön: Stängt</div>
  </div>
);

// Bild till vänster, text till höger
const ImageLeftInfo = () => (
  <section className="mb-12 flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="flex-shrink-0 w-full md:w-1/2 h-64 relative">
      <Image
        src="/images/bipolar/bipolarity.webp"
        alt="Information"
        fill
        className="object-cover object-center"
      />
    </div>
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold text-primary-accent mb-2">
        Hur fungerar myndigheter?
      </h2>
      <p className="text-gray-700 mb-2">
        Myndigheter ansvarar för olika delar av samhället och finns till för att
        hjälpa dig i olika situationer. Här kan du läsa mer om deras uppdrag och
        hur du kan kontakta dem.
      </p>
      <ul className="list-disc list-inside text-primary-dark">
        <li>Stöd och rådgivning</li>
        <li>Ekonomisk hjälp</li>
        <li>Information om rättigheter</li>
      </ul>
    </div>
  </section>
);

// Bild som bakgrund med overlay och text
const BackgroundImageOverlay = () => (
  <section className="mb-12 relative h-72 md:h-96 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
    <Image
      src="/images/bipolar/bipolarity.webp"
      alt="Bakgrund"
      fill
      className="object-cover object-center"
    />
    <div className="absolute inset-0 bg-primary-dark/70 flex flex-col items-center justify-center text-center p-8">
      <h2 className="text-3xl md:text-4xl font-bold text-primary-light mb-2">
        Få hjälp när du behöver det
      </h2>
      <p className="text-primary-light text-lg max-w-2xl">
        Vi guidar dig till rätt myndighet och hjälper dig att förstå dina
        rättigheter och möjligheter.
      </p>
    </div>
  </section>
);

// Bildgrid med text
const ImageGridInfo = () => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold text-primary-dark mb-6 text-center">
      Olika myndigheter
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {[
        'Socialstyrelsen',
        'Försäkringskassan',
        'Arbetsförmedlingen',
        'Migrationsverket',
      ].map((name) => (
        <div
          key={name}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center"
        >
          <div className="w-full h-40 relative">
            <Image
              src="/images/bipolar/bipolarity.webp"
              alt={name}
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="p-4 flex-1 flex flex-col items-center">
            <div className="font-bold text-primary-accent text-lg mb-1">
              {name}
            </div>
            <div className="text-gray-700 text-center">
              Läs mer om {name} och deras uppdrag.
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// Informationsblock med stor bild
const InfoBlockLargeImage = () => (
  <section className="mb-12 flex flex-col md:flex-row items-center gap-8 bg-secondary-light rounded-xl shadow-lg overflow-hidden">
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold text-secondary-dark mb-2">
        Vad kan du få hjälp med?
      </h2>
      <p className="text-gray-700 mb-2">
        Myndigheter erbjuder stöd inom många områden, från sjukvård till ekonomi
        och juridik. Ta reda på vad som gäller för dig!
      </p>
      <ul className="list-disc list-inside text-secondary-dark">
        <li>Hälso- och sjukvård</li>
        <li>Ekonomiskt stöd</li>
        <li>Rådgivning och information</li>
      </ul>
    </div>
    <div className="flex-shrink-0 w-full md:w-[340px] h-64 relative">
      <Image
        src="/images/bipolar/bipolarity.webp"
        alt="Stöd"
        fill
        className="object-cover object-center md:rounded-r-xl"
      />
    </div>
  </section>
);

// Sektion med stor bild och lista

// Bild till vänster, rubrik och två paragrafer till höger
const ImageLeftTwoParagraphs = () => (
  <section className="mb-16 flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="flex-shrink-0 w-full md:w-1/2 h-64 relative">
      <Image
        src="/images/bipolar/bipolarity.webp"
        alt="Information"
        fill
        className="object-cover object-center"
      />
    </div>
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold text-primary-dark mb-2">
        Så fungerar myndigheterna
      </h2>
      <p className="text-gray-700 mb-2">
        Sveriges myndigheter har olika ansvarsområden och finns till för att
        hjälpa dig i olika livssituationer.
      </p>
      <p className="text-gray-700">
        Genom att kontakta rätt myndighet kan du få stöd, råd och information
        som är anpassad efter dina behov.
      </p>
    </div>
  </section>
);

// Bild till höger, rubrik och en paragraf till vänster
const TextLeftImageRight = () => (
  <section className="mb-16 flex flex-col md:flex-row items-center gap-8 bg-secondary-light rounded-xl shadow-lg overflow-hidden">
    <div className="flex-1 p-8 order-2 md:order-1">
      <h2 className="text-2xl font-bold text-secondary-dark mb-2">
        Din väg till stöd
      </h2>
      <p className="text-gray-700">
        Vi guidar dig genom processen och ser till att du får den hjälp du har
        rätt till.
      </p>
    </div>
    <div className="flex-shrink-0 w-full md:w-1/2 h-64 relative order-1 md:order-2">
      <Image
        src="/images/bipolar/bipolarity.webp"
        alt="Stöd"
        fill
        className="object-cover object-center"
      />
    </div>
  </section>
);

// Bild som bakgrund till textblock
const BackgroundImageTextBlock = () => (
  <section className="mb-16 relative rounded-2xl overflow-hidden shadow-lg min-h-[220px] flex items-center justify-center">
    <Image
      src="/images/bipolar/bipolarity.webp"
      alt="Bakgrund text"
      fill
      className="object-cover object-center opacity-40"
    />
    <div className="relative z-10 p-10 w-full max-w-2xl text-center">
      <h2 className="text-2xl font-bold text-primary-dark mb-2">
        Information när du behöver det
      </h2>
      <p className="text-primary-dark text-lg">
        Vi samlar viktig information om myndigheter på ett och samma ställe för
        att göra det enklare för dig.
      </p>
    </div>
  </section>
);

const AuthoritiesPage = () => {
  return (
    <main className="max-w-[1440px] mx-auto px-4 py-8">
      <InfoBox />
      <Statistics />
      <FeatureHighlights />
      <AuthoritiesGrid />
      <AuthoritiesImageCards />
      <Carousel />
      <SideBySideInfo />
      <Timeline />
      <Callout />
      <ImportantDates />
      <ContactSection />
      <StickyInfoBar />
      <GlassCard />

      <FloatingCards />
      <RibbonCard />
      <BadgeRow />
      <Tabbar />
      <MasonryGrid />

      <MediaHighlight />
      <ParallaxSection />
      <OverlayCard />
      <InfoPopover />
      <TagCloud />
      <ProgressCircle percent={85} />
      <StatCards />
      <ComparisonCards />
      <InfoBlocks />
      <LinkCollection />
      <InfoTimeline />
      <MapSection />
      <AddressCard />
      <OpeningHours />
      <ImageLeftInfo />
      <BackgroundImageOverlay />
      <ImageGridInfo />
      <InfoBlockLargeImage />
      <MediumImageWithText
        title="Så här kontaktar du en myndighet"
        description="Om du eller någon i din närhet upplever ovanstående symptom och de påverkar vardagen negativt, bör vård sökas så snart som möjligt. Vid akuta situationer, som tankar på att skada sig själv eller andra, ska du kontakta psykiatrisk akutmottagning eller ringa 112."
        image="/images/bipolar/bipolarity.webp"
        alignment="right"
      />
      <MediumImageWithText
        title="Så här kontaktar du en myndighet"
        description="Om du eller någon i din närhet upplever ovanstående symptom och de påverkar vardagen negativt, bör vård sökas så snart som möjligt. Vid akuta situationer, som tankar på att skada sig själv eller andra, ska du kontakta psykiatrisk akutmottagning eller ringa 112."
        image="/images/bipolar/bipolarity.webp"
        type="tertiary"
        alignment="left"
      />

      <ImageLeftTwoParagraphs />
      <TextLeftImageRight />
      <BackgroundImageTextBlock />
    </main>
  );
};

export default AuthoritiesPage;
