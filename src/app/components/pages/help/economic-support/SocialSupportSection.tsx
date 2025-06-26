import BenefitCard from '@/app/components/pages/help/law-and-rights/BenefitCard';
import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import { SOCIAL_SUPPORT_BENEFITS } from '@/app/data/help/economic';
import { FaHandHoldingHeart } from 'react-icons/fa';

const SocialSupportSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="content-container">
        <SectionTitle icon={<FaHandHoldingHeart />} type="tertiary">
          Ekonomiskt stöd från samhället
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {SOCIAL_SUPPORT_BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-primary-dark">
            Budget- och skuldrådgivning
          </h3>
          <p className="">
            Många kommuner erbjuder gratis budget- och skuldrådgivning. Detta
            kan vara särskilt värdefullt om du har svårt att hålla koll på din
            ekonomi eller har hamnat i ekonomiska svårigheter.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">
              Vad kan budgetrådgivning hjälpa med?
            </h4>
            <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
              <li>Gå igenom din nuvarande ekonomiska situation</li>
              <li>Skapa en realistisk budget</li>
              <li>Planera för framtida utgifter</li>
              <li>Hantera skulder och betalningsplaner</li>
              <li>Kontakt med borgenärer vid behov</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-primary-dark">
            Viktiga kontakter
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800">Försäkringskassan</h4>
              <p className="text-gray-600 text-sm">
                För sjukersättning, aktivitetsersättning och bostadsbidrag
              </p>
              <a
                href="https://www.forsakringskassan.se"
                className="text-blue-600 text-sm underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                forsakringskassan.se
              </a>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800">
                Din kommuns socialtjänst
              </h4>
              <p className="text-gray-600 text-sm">
                För försörjningsstöd, budgetrådgivning och god man
              </p>
              <p className="text-gray-600 text-sm">
                Kontakta din kommun direkt
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800">Konsumentverket</h4>
              <p className="text-gray-600 text-sm">
                För råd om privatekonomi och konsumentskydd
              </p>
              <a
                href="https://www.konsumentverket.se"
                className="text-blue-600 text-sm underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                konsumentverket.se
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSupportSection;
