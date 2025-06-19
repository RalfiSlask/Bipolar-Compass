import Image from 'next/image';
import Link from 'next/link';
import {
  FaExclamationTriangle,
  FaHandsHelping,
  FaHeartbeat,
  FaQuestionCircle,
  FaRegHeart,
  FaUserShield,
} from 'react-icons/fa';
import Organizations from '../components/pages/relatives/Organizations';
import EncouragmentContainer from '../components/shared/EncouragmentContainer';
import SectionTitle from '../components/shared/headings/SectionTitle';
import HighlightList from '../components/shared/HighlightList';
import PageIntroContainer from '../components/shared/PageIntroContainer';
import RoundedImageWithHeadingList from '../components/shared/RoundedImageWithHeadingList';
import RoundedImageWithList from '../components/shared/RoundedImageWithList';
import { RELATIVES_INTRO } from '../data/pageIntros';
import { RELATIVE_TIPS } from '../data/relatives';

const RelativePage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={RELATIVES_INTRO} />
      <div className="flex flex-col gap-4 sm:gap-10">
        <div className="flex flex-col content-container">
          <SectionTitle icon={<FaQuestionCircle />} iconClasses="text-2xl">
            Vad innebär bipolär sjukdom?
          </SectionTitle>
          <p>
            Bipolär sjukdom är en kronisk psykisk sjukdom som påverkar humöret.
            Det innebär att en person växlar mellan maniska eller hypomaniska
            faser (förhöjt humör och energi) och depressiva faser (nedstämdhet
            och låg energi). Mellan dessa episoder kan personen ofta ha långa
            perioder av stabilitet.
          </p>
          <p className=" mt-4">
            Som anhörig är det viktigt att förstå att dessa humörsvängningar
            inte är något din närstående kan kontrollera. Det handlar inte om
            att &quot;ta sig samman&quot; – det är en sjukdom som kräver
            professionell behandling och ett långsiktigt stöd från omgivningen.
          </p>
        </div>

        <div className="content-container">
          <SectionTitle icon={<FaHandsHelping />}>
            Din roll som anhörig
          </SectionTitle>
          <p className="mt-4">
            Din närstående behöver både kärlek och praktiskt stöd, men din roll
            som anhörig handlar också om att hitta en balans mellan att hjälpa
            andra och ta hand om dig själv. Här är några konkreta sätt du kan
            göra skillnad:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {RELATIVE_TIPS.map((item, index) => (
              <div
                key={index}
                className="bg-primary-light rounded-lg p-4 shadow-md"
              >
                <h4 className="text-lg mb-2 text-primary-dark font-semibold">
                  {item.title}
                </h4>
                <p className="text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <RoundedImageWithHeadingList
          title=" Vanliga utmaningar för anhöriga"
          headingsList={[
            {
              title: 'Känslomässig belastning',
              description:
                'Du kan känna frustration eller maktlöshet när din närstående inte mår bra. Det är viktigt att erkänna dessa känslor som normala och söka stöd vid behov.',
            },
            {
              title: 'Oro för framtiden',
              description:
                'Det är naturligt att känna oro för hur sjukdomen kommer påverka er relation, din närståendes arbete eller ekonomi. Genom att skapa en stabil stödstruktur kan ni minska dessa risker.',
            },
            {
              title: 'Social isolering',
              description:
                'Många anhöriga upplever att de själva blir isolerade när deras närstående är sjuk. Det är viktigt att du hittar egna sociala sammanhang där du kan få energi.',
            },
          ]}
          image="/images/relatives/struggle.webp"
          type="tertiary"
          imageAlt="Stress"
          linkText="själv hjälp"
          link="/behandling/sjalvhjalp"
        />
        <RoundedImageWithList
          title="När tvångsvård kan bli nödvändig"
          desc="I vissa situationer, särskilt när din närstående befinner sig i ett maniskt eller psykotiskt tillstånd, kan det bli nödvändigt att ansöka om tvångsvård. Detta är ofta en sista utväg när personen inte kan förstå sin egen situation eller är en fara för sig själv eller andra. Tvångsvård regleras av Lagen om psykiatrisk tvångsvård (LPT) och kan bli aktuellt om följande kriterier är uppfyllda:"
          subdesc="Tvångsvård regleras av Lagen om psykiatrisk tvångsvård (LPT) och kan bli aktuellt om följande kriterier är uppfyllda:"
          image="/images/relatives/hospital.webp"
          imageAlt="Stress"
          listItems={[
            {
              text: 'Personen lider av en allvarlig psykisk störning (som bipolär sjukdom i mani eller psykos).',
            },
            {
              text: 'Personen behöver psykiatrisk vård som inte kan ges frivilligt.',
            },
            {
              text: 'Personen utgör en fara för sig själv eller andra, eller riskerar att allvarligt försämras utan vård.',
            },
          ]}
        />
        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-2">
            Hur går man tillväga för att ansöka om tvångsvård?
          </h3>
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="font-semibold mb-2">Kontakta sjukvården</h4>
              <p>
                Om du misstänker att din närstående behöver tvångsvård ska du
                kontakta psykiatrin i din region. De flesta regioner har
                jourmottagningar för psykiatri som är öppna dygnet runt. Om
                situationen är akut kan du antigen söka hjälp via vår{' '}
                <Link
                  href="/akut"
                  className="nav-link text-primary-dark font-semibold"
                >
                  akut sida {''}
                </Link>
                {''}
                eller direkt ringa{' '}
                <span className="text-primary-dark font-semibold">112</span>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Beskriv situationen</h4>
              <p className=" mb-2">
                Var tydlig när du pratar med vårdpersonal. Förklara varför du
                tror att din närstående behöver tvångsvård, till exempel om de:
              </p>
              <HighlightList
                list={[
                  'Uppvisar farligt eller riskabelt beteende',
                  'Har hallucinationer eller vanföreställningar',
                  'Vägrar vård trots att de tydligt mår mycket dåligt',
                ]}
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Läkarbedömning</h4>
              <p>
                En läkare behöver göra en bedömning för att fastställa om
                tvångsvård är nödvändig. Om läkaren anser att kriterierna för
                tvångsvård är uppfyllda, skrivs ett vårdintyg som är grunden för
                att personen ska kunna bli inlagd.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Beslut om tvångsvård</h4>
              <p>
                Efter att personen blivit inlagd måste en chefsöverläkare inom
                24 timmar besluta om tvångsvården ska fortsätta. Beslutet
                baseras på vårdintyget och en ny bedömning.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center content-container gap-6 p-6 rounded-xl shadow-lg">
          <h3 className="h-xs text-tertiary-dark font-bold">
            Att tänka på som anhörig vid tvångsvård
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="bg-tertiary-light  rounded-lg p-6 flex flex-col items-center text-center shadow-md">
              <FaRegHeart className="text-tertiary-dark text-3xl mb-4" />
              <h4 className="font-bold text-lg mb-2 text-tertiary-dark ">
                Det är inte ditt fel
              </h4>
              <p className="text-tertiary-dark  text-base">
                Att ansöka om tvångsvård kan vara svårt och skuldbelagt. Kom
                ihåg att detta handlar om att skydda din närstående och ge dem
                nödvändig vård.
              </p>
            </div>
            <div className="bg-tertiary-light rounded-lg p-6 flex flex-col items-center text-center shadow-md">
              <FaExclamationTriangle className="text-tertiary-dark text-3xl mb-4" />
              <h4 className="font-semibold text-tertiary-dark text-lg mb-2">
                Var beredd på motstånd
              </h4>
              <p className="text-tertiary-dark  text-base">
                Många i mani eller psykos förstår inte sitt tillstånd. Det är
                viktigt att behålla lugnet och låta vårdpersonalen hantera
                situationen.
              </p>
            </div>
            <div className="bg-tertiary-light  rounded-lg p-6 flex flex-col items-center text-center shadow-md">
              <FaUserShield className="text-tertiary-dark text-3xl mb-4" />
              <h4 className="font-semibold text-lg text-tertiary-dark mb-2">
                Ta hand om dig själv
              </h4>
              <p className="text-tertiary-dark  text-base">
                Processen kan vara känslomässigt krävande. Se till att du har
                stöd från andra anhöriga, vänner eller professionella.
              </p>
            </div>
          </div>
        </div>

        <div className="content-container">
          <SectionTitle icon={<FaHeartbeat />} iconClasses="text-2xl">
            Mobila psykiatriska team och läkarbedömning på plats
          </SectionTitle>
          <p className="mt-4">
            I många regioner i Sverige finns det mobila psykiatriska team som
            kan åka ut till personer i behov av akut psykiatrisk vård. Dessa
            team består vanligtvis av sjuksköterskor, läkare och annan
            psykiatrisk personal som kan göra en initial bedömning på plats och
            avgöra om personen behöver tvångsvård eller annan form av stöd.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-primary-light rounded-lg p-4 shadow-md">
              <h4 className="text-lg mb-2 text-primary-dark font-semibold">
                När kan detta bli aktuellt?
              </h4>
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>
                  Din närstående vägrar lämna hemmet eller en annan plats för
                  att uppsöka vård.
                </li>
                <li>
                  Situationen är akut, och du som anhörig bedömer att personen
                  är en fara för sig själv eller andra.
                </li>
                <li>
                  Du misstänker att personen befinner sig i ett maniskt,
                  psykotiskt eller allvarligt depressivt tillstånd.
                </li>
              </ul>
            </div>

            <div className="bg-primary-light rounded-lg p-4 shadow-md">
              <h4 className="text-lg mb-2 text-primary-dark font-semibold">
                Hur kontaktar man ett mobilt psykiatriskt team?
              </h4>
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>
                  Ring psykiatriska jourmottagningen eller titta på vår sida om{' '}
                  {''}
                  <Link
                    href="/akut"
                    className="nav-link text-primary-dark font-semibold"
                  >
                    akut hjälp
                  </Link>
                  .
                </li>
                <li>
                  Förklara tydligt varför en akut bedömning på plats är
                  nödvändig.
                </li>
                <li>
                  Vid omedelbar fara, ring{' '}
                  <span className="font-semibold">112</span>.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 px-4 md:px-8 md:gap-8 content-container">
          <div className="flex flex-1">
            <Image
              src="/images/relatives/doctor.webp"
              alt="relative"
              width={1000}
              height={1000}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <h3 className="h-xs text-primary-dark ">
              Vad händer när läkaren kommer till platsen?
            </h3>
            <div className="bg-primary-light/50 rounded-md p-4">
              <ul className="flex flex-col gap-2 list-disc list-inside">
                <li className="flex gap-2 flex-col">
                  <h4 className="font-semibold">Initial bedömning:</h4>
                  <p>
                    Läkaren pratar med personen och gör en medicinsk och
                    psykiatrisk bedömning.
                  </p>
                </li>
                <li className="flex gap-2 flex-col">
                  <h4 className="font-semibold">Beslut om vårdintyg:</h4>
                  <p>
                    Om läkaren bedömer att kriterierna för tvångsvård är
                    uppfyllda enligt Lagen om psykiatrisk tvångsvård (LPT), kan
                    de utfärda ett vårdintyg direkt på plats.
                  </p>
                </li>
                <li className="flex gap-2 flex-col">
                  <h4 className="font-semibold">
                    {' '}
                    Transport till vårdinrättning:
                  </h4>
                  <p>
                    Om tvångsvård krävs, ansvarar vården för att personen
                    transporteras till en psykiatrisk enhet. I vissa fall
                    samarbetar vården med polisen eller ambulanssjukvården.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row px-4 md:px-8 gap-4 md:gap-8 content-container">
          <div className="flex flex-1 flex-col gap-4">
            <h3 className="h-xs text-primary-dark">
              Vad kan du som anhörig göra under tiden?
            </h3>
            <div className="bg-primary-light/50 rounded-md p-4">
              <ul className="flex flex-col gap-2 list-disc list-inside">
                <li className="flex gap-2 flex-col">
                  <h4 className="font-semibold">Håll dig lugn:</h4>
                  <p>
                    Försök att undvika att eskalera situationen. Förklara för
                    din närstående att det mobila teamet är där för att hjälpa.
                  </p>
                </li>
                <li className="flex gap-2 flex-col">
                  <h4 className="font-semibold">Förbered information:</h4>
                  <p>
                    Ha detaljer om din närståendes medicinska historia, aktuella
                    symtom och eventuella tidigare vårdkontakter redo för att
                    underlätta bedömningen.
                  </p>
                </li>
                <li className="flex gap-2 flex-col">
                  <h4 className="font-semibold">Ta hand om dig själv:</h4>
                  <p>
                    Att hantera sådana situationer kan vara känslomässigt
                    påfrestande. Sök stöd från andra anhöriga eller vänner om
                    möjligt.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-1">
            <Image
              src="/images/relatives/relative-hands.webp"
              alt="relative"
              width={1000}
              height={1000}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col content-container">
          <h3 className="h-xs text-primary-dark mb-2">
            Finns det mobila psykiatriska team i hela Sverige?
          </h3>
          <p>
            Mobila psykiatriska team finns i de flesta regioner, men tillgången
            varierar. Vissa regioner har välutbyggda team som är tillgängliga
            dygnet runt, medan andra har mer begränsade resurser. Det är viktigt
            att kontakta psykiatrin i din region för att få information om vad
            som gäller där du bor.
          </p>
        </div>

        <EncouragmentContainer
          text="Att vara anhörig till någon med bipolär sjukdom kan vara tufft, men
            du är inte ensam i din situation. Genom att söka stöd, bygga kunskap
            och ta hand om dig själv kan du vara en värdefull resurs för din
            närstående samtidigt som du skyddar ditt eget välmående. "
        />

        <div className="flex flex-col items-center gap-10">
          <h3 className="h-md mt-8 sm:mt-0 text-primary-dark mb-2">
            Organisationer som kan hjälpa dig
          </h3>
          <Organizations />
        </div>
      </div>
    </section>
  );
};

export default RelativePage;
