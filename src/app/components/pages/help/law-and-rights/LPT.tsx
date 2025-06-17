import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import LinkWithArrow from '@/app/components/shared/links/LinkWithArrow';
import { FaShieldAlt } from 'react-icons/fa';

const LPT = () => {
  return (
    <div className="content-container">
      <SectionTitle icon={<FaShieldAlt />}>
        Psykiatrisk tvångsvård (LPT)
      </SectionTitle>
      <div className="bg-primary-light/50 rounded-lg p-4 sm:p-6">
        <p className="mb-4">
          Lagen om psykiatrisk tvångsvård (LPT) reglerar när tvångsvård kan
          tillämpas. Detta är en känslig fråga som påverkar både patientens
          rättigheter och säkerhet.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">
              När kan tvångsvård tillämpas?
            </h4>
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>Vid allvarlig psykisk störning</li>
              <li>
                När vård behövs för att förhindra att personen skadar sig själv
                eller andra
              </li>
              <li>När frivillig vård inte är möjlig</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              Dina rättigheter vid tvångsvård
            </h4>
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>Rätt till information om anledningen</li>
              <li>Rätt till rättshjälp</li>
              <li>Rätt att överklaga beslutet</li>
              <li>Rätt till regelbunden bedömning av tvångsvården</li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <LinkWithArrow
            link="https://www.socialstyrelsen.se/globalassets/sharepoint-dokument/artikelkatalog/ovrigt/2020-7-6854.pdf"
            text="Läs mer om LPT hos Socialstyrelsen"
          />
        </div>
      </div>
    </div>
  );
};

export default LPT;
