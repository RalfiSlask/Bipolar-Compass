import MainPageImageGrid from '../components/shared/MainPageImageGrid';
import { MULTIMEDIA_LINKS } from '../data/multimediaLinks';

const MultiMediaPage = () => {
  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="mb-20 text-left">
          <h2 className="text-5xl md:text-6xl text-center font-bold text-primary-dark mb-8 animate-fade-in">
            Multimedia
          </h2>
          <div className="flex flex-col gap-4 justify-center bg-primary-light max-w-4xl mx-auto p-4 rounded-lg">
            <p className="text-secondary-dark">
              Utforska vårt multimedia-bibliotek där vi har samlat ett urval av
              filmer, musik och podcasts som belyser olika aspekter av bipolär
              sjukdom. Genom att kombinera konst och information hoppas vi ge en
              djupare förståelse för hur sjukdomen påverkar livet och samtidigt
              inspirera till reflektion och stöd.
            </p>
            <p className="text-secondary-dark font-semibold">
              Upptäck resurser som inte bara utbildar utan också engagerar, vare
              sig det är genom en tankeväckande film, en lugnande spellista,
              eller en podcast fylld med insikter om mental hälsa.
            </p>
          </div>
        </div>

        <nav className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MULTIMEDIA_LINKS.map((item) => (
            <MainPageImageGrid key={item.href} item={item} />
          ))}
        </nav>
      </div>
    </section>
  );
};

export default MultiMediaPage;
