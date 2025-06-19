import SectionTitle from "../components/shared/headings/SectionTitle";
import { FaQuestionCircle } from "react-icons/fa";

const WhatIsBipolar = () => {
  return (
    <div className="flex flex-col content-container">
      <SectionTitle icon={<FaQuestionCircle />} iconClasses="text-2xl">
        Vad innebär bipolär sjukdom?
      </SectionTitle>
      <p>
        Bipolär sjukdom är en kronisk psykisk sjukdom som påverkar humöret. Det
        innebär att en person växlar mellan maniska eller hypomaniska faser
        (förhöjt humör och energi) och depressiva faser (nedstämdhet och låg
        energi). Mellan dessa episoder kan personen ofta ha långa perioder av
        stabilitet.
      </p>
      <p className=" mt-4">
        Som anhörig är det viktigt att förstå att dessa humörsvängningar inte är
        något din närstående kan kontrollera. Det handlar inte om att &quot;ta
        sig samman&quot; – det är en sjukdom som kräver professionell behandling
        och ett långsiktigt stöd från omgivningen.
      </p>
    </div>
  );
};

export default WhatIsBipolar;
