import { MdBarChart } from 'react-icons/md';
import SectionTitle from '../../shared/headings/SectionTitle';
import BipolarPrevalence from './BipolarPrevalence';

const BipolarPrevalenceInfo = () => {
  return (
    <div className="md:col-span-2">
      <div className="content-container">
        <SectionTitle icon={<MdBarChart />}>
          Prevalens av bipolär sjukdom
        </SectionTitle>
        <p className="mb-6 ">
          Bipolär sjukdom är en relativt vanlig psykisk sjukdom som förekommer
          över hela världen, oavsett kulturella eller geografiska skillnader.
          Här är en sammanfattning av vad forskningen säger om prevalensen:
        </p>

        <div className="lightest-list-container">
          <ul className="flex flex-col gap-4 list-disc list-inside">
            <li>
              <span className="font-semibold">Global prevalens:</span> Cirka 1–2
              % av den globala befolkningen diagnostiseras med bipolär sjukdom
              typ 1 eller typ 2. När mildare former som cyklotymi inkluderas,
              stiger prevalensen till cirka 4 % av befolkningen.
            </li>
            <li>
              <span className="font-semibold">Könsfördelning:</span> Bipolär
              sjukdom påverkar män och kvinnor i ungefär samma utsträckning,
              även om kvinnor oftare diagnostiseras med bipolär sjukdom typ 2
              och blandade episoder, medan män oftare diagnostiseras med bipolär
              sjukdom typ 1.
            </li>
            <li>
              <span className="font-semibold">Åldersgrupper:</span> Sjukdomen
              debuterar ofta i sena tonåren eller tidig vuxen ålder, vanligtvis
              mellan 15 och 30 år. Tidig debut under tonåren kan förknippas med
              svårare förlopp och högre risk för samsjuklighet.
            </li>
            <li>
              <span className="font-semibold">Samsjuklighet:</span> Personer med
              bipolär sjukdom har ofta andra psykiska hälsotillstånd, som
              ångeststörningar, missbruk eller ADHD. Detta kan göra diagnos och
              behandling mer komplex.
            </li>
            <li>
              <span className="font-semibold">Regionala skillnader:</span>{' '}
              Prevalensen varierar något mellan länder och regioner, vilket kan
              bero på kulturella faktorer, diagnostiska metoder och tillgång
              till vård. Forskning från Sverige visar en prevalens på cirka 2 %
              i den vuxna befolkningen.
            </li>
          </ul>
        </div>
      </div>
      <BipolarPrevalence />
    </div>
  );
};

export default BipolarPrevalenceInfo;
