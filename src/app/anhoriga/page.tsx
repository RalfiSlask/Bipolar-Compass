import EncouragmentContainer from '../components/shared/EncouragmentContainer';
import PageIntroContainer from '../components/shared/PageIntroContainer';
import RoundedImageWithHeadingList from '../components/shared/RoundedImageWithHeadingList';
import RoundedImageWithList from '../components/shared/RoundedImageWithList';
import { RELATIVES_INTRO } from '../data/pageIntros';
import CompulsoryCareSteps from './components/CompulsoryCareSteps';
import FinalNoteOnAccess from './components/FinalNoteOnAccess';
import MobileTeamExplanation from './components/MobileTeamExplanation';
import RoleAsRelative from './components/RoleAsRelative';
import SupportOrganizations from './components/SupportOrganizations';
import TipsCards from './components/TipsCards';
import WhatIsBipolar from './components/WhatIsBipolar';
import WhatToDoDuringVisit from './components/WhatToDoDuringVisit';

const RelativePage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={RELATIVES_INTRO} />
      <div className="flex flex-col page-gaps">
        <WhatIsBipolar />
        <RoleAsRelative />
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
          linkText="självhjälp"
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
        <CompulsoryCareSteps />
        <TipsCards />
        <MobileTeamExplanation />
        <WhatToDoDuringVisit />
        <FinalNoteOnAccess />

        <EncouragmentContainer
          text="Att vara anhörig till någon med bipolär sjukdom kan vara tufft, men
            du är inte ensam i din situation. Genom att söka stöd, bygga kunskap
            och ta hand om dig själv kan du vara en värdefull resurs för din
            närstående samtidigt som du skyddar ditt eget välmående. "
        />
        <SupportOrganizations />
      </div>
    </section>
  );
};

export default RelativePage;
