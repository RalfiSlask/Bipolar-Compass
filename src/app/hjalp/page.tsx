import MainPageImageGrid from '../components/shared/MainPageImageGrid';
import { HELP_LINKS } from '../data/page-links/helpLinks';

const HelpPage = () => {
  return (
    <section className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-16 sm:pb-24">
        <div className="mb-8 sm:mb-20 text-left">
          <h2 className="text-5xl md:text-6xl text-center font-bold text-primary-dark mb-8 animate-fade-in">
            Bipolär sjukdom
          </h2>
          <div className="flex flex-col gap-4 justify-center bg-primary-light  0 max-w-4xl mx-auto p-4 rounded-lg">
            <p className="text-secondary-dark">
              Bipolär sjukdom är en psykisk sjukdom som kännetecknas av kraftiga
              svängningar i stämningsläget. Personer med sjukdomen upplever
              perioder av depression och mani eller hypomani.
            </p>
            <p className="text-secondary-dark font-semibold">
              Här kan du läsa mer om symtom, olika typer av diagnos och få svar
              på vanliga frågor om sjukdomen.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-6xl">
          {HELP_LINKS.map((item) => (
            <MainPageImageGrid key={item.href} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpPage;
