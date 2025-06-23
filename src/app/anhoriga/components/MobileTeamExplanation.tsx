import Link from "next/link";
import { FaHeartbeat } from "react-icons/fa";
import SectionTitle from "../../components/shared/headings/SectionTitle";

const MobileTeamExplanation = () => {
  return (
    <div className="content-container">
      <SectionTitle icon={<FaHeartbeat />} iconClasses="text-2xl">
        Mobila psykiatriska team och läkarbedömning på plats
      </SectionTitle>
      <p className="mt-4">
        I många regioner i Sverige finns det mobila psykiatriska team som kan
        åka ut till personer i behov av akut psykiatrisk vård. Dessa team består
        vanligtvis av sjuksköterskor, läkare och annan psykiatrisk personal som
        kan göra en initial bedömning på plats och avgöra om personen behöver
        tvångsvård eller annan form av stöd.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-primary-light rounded-lg p-4 shadow-md">
          <h4 className="text-lg mb-2 text-primary-dark font-semibold">
            När kan detta bli aktuellt?
          </h4>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>
              Din närstående vägrar lämna hemmet eller en annan plats för att
              uppsöka vård.
            </li>
            <li>
              Situationen är akut, och du som anhörig bedömer att personen är en
              fara för sig själv eller andra.
            </li>
            <li>
              Du misstänker att personen befinner sig i ett maniskt, psykotiskt
              eller allvarligt depressivt tillstånd.
            </li>
          </ul>
        </div>

        <div className="bg-primary-light rounded-lg p-4 shadow-md">
          <h4 className="text-lg mb-2 text-primary-dark font-semibold">
            Hur kontaktar man ett mobilt psykiatriskt team?
          </h4>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>
              Ring psykiatriska jourmottagningen eller titta på vår sida om {""}
              <Link
                href="/akut"
                className="nav-link text-primary-dark font-semibold"
              >
                akut hjälp
              </Link>
              .
            </li>
            <li>
              Förklara tydligt varför en akut bedömning på plats är nödvändig.
            </li>
            <li>
              Vid omedelbar fara, ring{" "}
              <span className="font-semibold">112</span>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileTeamExplanation;
