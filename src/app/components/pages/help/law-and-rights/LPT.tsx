import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import LinkWithArrow from '@/app/components/shared/links/LinkWithArrow';
import { FaShieldAlt } from 'react-icons/fa';

const LPT = () => {
  return (
    <div className="content-container">
      <SectionTitle icon={<FaShieldAlt />}>
        Lagen om psykiatrisk tvångsvård (LPT)
      </SectionTitle>
      <div className="lightest-list-container">
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
              <li>När allvarlig psykisk störning finns</li>
              <li>När personen kan skada sig själv eller andra</li>
              <li>När frivillig vård inte är möjlig</li>
              <li>När självmordsrisken är hög</li>
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
