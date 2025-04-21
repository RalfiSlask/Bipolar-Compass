import Image from 'next/image';
import {
  FaBrain,
  FaChartLine,
  FaHandHoldingHeart,
  FaSun,
} from 'react-icons/fa';
import { FaQuoteLeft } from 'react-icons/fa6';

const VisionPage = () => {
  return (
    <section className="container mx-auto max-w-6xl w-full flex flex-col gap-24 pt-12 pb-28 px-4">
      <div className="md:relative">
        <div className="hidden md:block absolute right-0 top-12 w-[95%] h-[400px] bg-primary-light rounded-lg -z-10" />
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/about/our-vision.webp"
              alt="our vision"
              aria-label="vår vision, bild på en person i solnedgången"
              width={600}
              height={400}
              priority={true}
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 relative bg-primary-light md:bg-transparent p-8 md:p-0 rounded-lg md:rounded-none">
            <FaQuoteLeft className="hidden md:block absolute -z-10 text-5xl text-primary-medium opacity-70 -left-4 -top-6" />
            <h2 className="h-md text-primary-dark mb-4">Vår Vision</h2>
            <p className="text-lg text-gray-700">
              Välkommen till Bipolärkompassen – en plats skapad för att ge stöd,
              kunskap och inspiration till alla som på något sätt påverkas av
              bipolär sjukdom. Oavsett om du är diagnostiserad, anhörig, eller
              vårdpersonal, är vår vision att erbjuda en trygg plattform där du
              kan lära, reflektera och växa.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12 max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FaBrain className="text-3xl text-primary-dark" />
            <h3 className="text-2xl font-semibold text-primary-dark">
              Kunskap och Förståelse
            </h3>
          </div>
          <p className="text-lg text-gray-700">
            Vi tror att kunskap är grunden till förändring. Med tillgång till
            forskningsartiklar, pedagogiska resurser och en AI-assistent som
            svarar på dina frågor, vill vi göra information om bipolär sjukdom
            tillgänglig och enkel att förstå. Genom att dela den senaste
            forskningen och insikterna hoppas vi minska stigma och öka
            medvetenheten.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FaChartLine className="text-3xl text-primary-dark" />
            <h3 className="text-2xl font-semibold text-primary-dark">
              Verktyg för Självinsikt och Välmående
            </h3>
          </div>
          <p className="text-lg text-gray-700">
            Vi erbjuder en rad verktyg för att hjälpa dig förstå och följa ditt
            mående:
          </p>
          <ul className="flex flex-col gap-4 mt-2">
            {[
              {
                title: 'Mood-tracker',
                description:
                  'En daglig funktion där du kan logga ditt humör och följa förändringar över tid.',
              },
              {
                title: 'Dagbok',
                description:
                  'Ett privat utrymme för reflektion, där du kan skriva om dina tankar, känslor och upplevelser.',
              },
              {
                title: 'Historik över mående',
                description:
                  'En visuell och interaktiv sammanställning av ditt humör över tid.',
              },
              {
                title: 'Multimediaval',
                description:
                  'Utforska musik, bilder och AI-genererat innehåll för inspiration.',
              },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary-dark text-lg mt-1">•</span>
                <span className="text-lg text-gray-700">
                  <span className="font-medium">{item.title}:</span>{' '}
                  {item.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FaHandHoldingHeart className="text-3xl text-primary-dark" />
            <h3 className="text-2xl font-semibold text-primary-dark">
              Stöd för Anhöriga och Vårdpersonal
            </h3>
          </div>
          <p className="text-lg text-gray-700">
            För anhöriga och vårdpersonal erbjuder vi resurser och insikter som
            hjälper till att förstå och stötta personer med bipolär sjukdom. Med
            en kombination av praktisk information och inspirerande multimedia
            hoppas vi kunna bidra till att stärka banden mellan individer och
            deras stödjande nätverk.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FaSun className="text-3xl text-primary-dark" />
            <h3 className="text-2xl font-semibold text-primary-dark">
              En Framtid utan Stigma
            </h3>
          </div>
          <p className="text-lg text-gray-700">
            Genom att tillhandahålla verktyg och kunskap vill vi skapa en värld
            där bipolär sjukdom inte definieras av fördomar utan av öppenhet och
            förståelse. Tillsammans kan vi bygga en framtid där psykisk hälsa är
            lika naturligt att prata om som fysisk hälsa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionPage;
