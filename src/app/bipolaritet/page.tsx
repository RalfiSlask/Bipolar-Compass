import MainPageImageGrid from '../components/shared/MainPageImageGrid';
import { bipolarLinks } from '../data/bipolarLinks';

const BipolarPage = () => {
  return (
    <section className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-primary-dark mb-8 animate-fade-in">
            Bipolär sjukdom
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto  px-4">
            Bipolär sjukdom är en psykisk sjukdom som kännetecknas av kraftiga
            svängningar i stämningsläget. Personer med sjukdomen upplever
            perioder av depression och mani eller hypomani. Här kan du läsa mer
            om symtom, olika typer av diagnos och få svar på vanliga frågor om
            sjukdomen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-6xl">
          {bipolarLinks.map((item) => (
            <MainPageImageGrid key={item.href} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BipolarPage;
