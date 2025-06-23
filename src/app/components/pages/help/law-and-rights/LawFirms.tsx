import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import { LAW_FIRMS_SPECIALIZED, LAW_GUIDES } from '@/app/data/help/lawRights';
import { FaGavel } from 'react-icons/fa';
import LawFirm from './LawFirm';

const LawFirms = () => {
  return (
    <div className="content-container">
      <SectionTitle icon={<FaGavel />}>Juridisk hjälp och stöd</SectionTitle>
      <div className="bg-primary-light/50 rounded-lg p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg mb-4">
              Specialiserade jurister
            </h4>
            <div className="flex flex-col gap-4">
              {LAW_FIRMS_SPECIALIZED.map((firm) => (
                <LawFirm key={firm.name} {...firm} />
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">
              Gratis stöd och vägledning
            </h4>
            <div className="flex flex-col gap-4">
              {LAW_GUIDES.map((guide) => (
                <LawFirm key={guide.name} {...guide} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-4 text-lg">
            Tips för att välja juridisk hjälp
          </h4>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>
              Kontrollera specialisering på socialförsäkringsrätt och psykisk
              ohälsa
            </li>
            <li>Förfråga om tidigare erfarenhet av liknande ärenden</li>
            <li>
              Se om dem erbjuder personliga möten eller online-konsultationer
            </li>
            <li>
              Förstå kostnadsstrukturen (fast pris, timarvode eller via
              rättsskydd)
            </li>
            <li>Kontakta flera jurister för att jämföra erbjudanden</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LawFirms;
