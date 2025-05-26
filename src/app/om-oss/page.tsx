import MainPageImageGrid from '../components/shared/MainPageImageGrid';
import { ABOUT_LINKS } from '../data/aboutLinks';

const AboutPage = () => {
  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-16 sm:pb-24">
        <div className="mb-20 text-left">
          <h2 className="text-5xl md:text-6xl text-center font-bold text-primary-dark mb-8 animate-fade-in">
            Om oss
          </h2>
          <div className="flex flex-col gap-4 justify-center bg-primary-light max-w-4xl mx-auto p-4 rounded-lg">
            <p className="text-secondary-dark">
              Vi är ett engagerat team som drivs av en gemensam vision: att
              skapa en plattform där personer med bipolär sjukdom kan hitta
              stöd, kunskap och gemenskap. Vi vet hur viktigt det är att känna
              sig förstådd och vill erbjuda en trygg plats där hjälp alltid är
              nära till hands.
            </p>
            <p className="text-secondary-dark font-semibold">
              Vårt mål är att göra vardagen enklare och mer hanterbar för dem
              som lever med bipolär sjukdom – och deras anhöriga.
            </p>
          </div>
        </div>

        <nav className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ABOUT_LINKS.map((item) => (
            <MainPageImageGrid key={item.href} item={item} />
          ))}
        </nav>
      </div>
    </section>
  );
};

export default AboutPage;
