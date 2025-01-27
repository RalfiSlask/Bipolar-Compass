import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';
import { bipolarLinks } from '../data/bipolarLinks';

const BipolarPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-dark mb-8 animate-fade-in">
            Bipolär sjukdom
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
            Bipolär sjukdom är en psykisk sjukdom som kännetecknas av kraftiga
            svängningar i stämningsläget. Personer med sjukdomen upplever
            perioder av depression och mani eller hypomani. Här kan du läsa mer
            om symtom, olika typer av diagnos och få svar på vanliga frågor om
            sjukdomen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-6xl">
          {bipolarLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative w-full pt-[56.25%]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
              </div>

              <div className="p-8 relative bg-white">
                <h3 className="text-2xl font-bold text-primary-dark group-hover:text-primary-medium transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="mt-4 text-lg text-gray-700 line-clamp-3">
                  {item.description}
                </p>
                <div className="mt-6 inline-flex items-center text-primary-medium group-hover:text-primary-dark transition-colors duration-200">
                  <span className="font-medium">Läs mer</span>
                  <HiArrowLongRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BipolarPage;
