import MainPageImageGrid from '../components/shared/MainPageImageGrid';
import { treatmentLinks } from '../data/treatmentLinks';

const TreatmentPage = () => {
  return (
    <section className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="mb-20 text-left">
          <h2 className="text-5xl md:text-6xl text-center font-bold text-primary-dark mb-8 animate-fade-in">
            Behandling
          </h2>
          <div className="flex flex-col gap-4 justify-center bg-primary-light  0 max-w-4xl mx-auto p-4 rounded-lg">
            <p className="text-secondary-dark">
              Bipolär sjukdom är en psykisk sjukdom som kännetecknas av kraftiga
              svängningar i stämningsläget. Personer med sjukdomen upplever
              perioder av djup depression där energinivån och motivationen är
              låg, och perioder av mani eller hypomani som kännetecknas av
              förhöjd energi, rastlöshet och ibland impulsivitet. Dessa
              svängningar kan påverka både det sociala livet och arbetsförmågan,
              och utan rätt behandling kan de bli svåra att hantera.
            </p>
            <p className="text-secondary-dark font-semibold">
              Oavsett om du är patient, anhörig eller vårdgivare finns det
              resurser som kan ge dig värdefull kunskap och vägledning.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-6xl">
          {treatmentLinks.map((item) => (
            <MainPageImageGrid key={item.href} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentPage;
