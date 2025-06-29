'use client';

import EncouragmentContainer from '@/app/components/shared/EncouragmentContainer';
import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import HighlightList from '@/app/components/shared/lists/HighlightList';
import { MediumImageWithText } from '@/app/components/shared/MediumImageWithText';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedLinks from '@/app/components/shared/RelatedLinks';
import { RoundedImageWithList } from '@/app/components/shared/RoundedImageWithList';
import {
  CHILDREN_YOUTH_SECTION_DATA,
  DEPRESSIVE_SYMPTOMS,
  EARLY_WARNING_SIGNS,
  EMERGENCY_HELP_OPTIONS,
  HYPOMANIC_SYMPTOMS,
  IMPORTANT_WARNING_SIGNS,
  MANIC_SYMPTOMS,
  PSYCHOTIC_SYMPTOMS,
} from '@/app/data/bipolar/symptoms/symptoms';
import { SYMPTOMS_INTRO } from '@/app/data/pageIntros';
import { BIPOLAR_RELATED_LINKS } from '@/app/data/related/relatedContentLinks';
import Link from 'next/link';
import {
  MdBolt,
  MdLocalHospital,
  MdOutlineMoodBad,
  MdPsychology,
  MdVisibilityOff,
  MdWarning,
  MdWbSunny,
} from 'react-icons/md';

const SymptomsPage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={SYMPTOMS_INTRO} />
      <div className="flex flex-col page-gaps">
        <div className="flex flex-col content-container">
          <SectionTitle icon={<MdBolt />}>
            Symptom under maniska episoder
          </SectionTitle>
          <p className="mb-4 ">
            En manisk episod innebär ett förhöjt, expansivt eller irritabelt
            humör som varar i minst en vecka och påverkar vardagen betydligt.
          </p>
          <HighlightList list={MANIC_SYMPTOMS} />
          <p className=" mt-4">
            Efter en manisk episod kan det vara känslomässigt tungt att inse
            vilka konsekvenser ens beteende har fått.
          </p>
        </div>

        <div className="flex flex-col content-container">
          <SectionTitle icon={<MdWbSunny />}>
            Symptom under hypomaniska episoder
          </SectionTitle>
          <p className="mb-4 ">
            Hypomani är en lindrigare form av mani, som inte leder till samma
            grad av funktionsnedsättning. Symptomen liknar de vid mani men är
            mindre intensiva och kortvariga (minst fyra dagar).
          </p>
          <HighlightList list={HYPOMANIC_SYMPTOMS} />
          <p className=" mt-4">
            Hypomaniska episoder kan ofta passera obemärkta av individen själv
            men kan ibland övergå i fullständig mani.
          </p>
        </div>

        <div className="flex flex-col content-container">
          <SectionTitle icon={<MdOutlineMoodBad />}>
            Symptom under depressiva episoder
          </SectionTitle>
          <p className="mb-4 ">
            Depressiva episoder innebär en kraftig nedstämdhet och minskad
            energi som varar i minst två veckor. Dessa symptom inkluderar:
          </p>
          <HighlightList list={DEPRESSIVE_SYMPTOMS} />
          <p className="mt-4">
            Depression vid bipolär sjukdom är ofta djupare och mer långvarig än
            vid en &quot;vanlig&quot; depression.
          </p>
        </div>

        <MediumImageWithText
          title="Blandade episoder"
          description="En blandad episod innebär att symptom på mani och depression uppträder samtidigt. Till exempel kan personen känna sig rastlös och upprymd, men samtidigt uppleva en djup nedstämdhet och hopplöshet. Dessa episoder är särskilt svåra att hantera och kräver ofta omedelbar vård."
          image="/images/bipolar/mixed.webp"
          imageAlt="Ligger fyra stycken emojis av olika mående och en manshand tar bort en ledsen emoji"
          type="tertiary"
          halfSize={true}
        />

        <div className="flex flex-col content-container">
          <SectionTitle icon={<MdVisibilityOff />}>
            Psykotiska symptom
          </SectionTitle>
          <p className="mb-4 ">
            Vid allvarlig mani eller depression kan psykotiska symptom uppstå,
            såsom:
          </p>
          <HighlightList list={PSYCHOTIC_SYMPTOMS} />
          <p className="mt-6">
            Dessa symptom försvinner vanligtvis med behandling.
          </p>
        </div>

        <div className="flex flex-col content-container">
          <SectionTitle icon={<MdWarning />}>
            Tidiga tecken och varningstecken
          </SectionTitle>
          <p className="mb-4 ">
            Många med bipolär sjukdom upplever tidiga tecken innan en ny episod.
            Det är viktigt att känna igen dessa tecken för att söka vård i tid:
          </p>
          <HighlightList list={EARLY_WARNING_SIGNS} />
        </div>

        <MediumImageWithText
          title="När bör du söka hjälp?"
          description="Om du eller någon i din närhet upplever ovanstående symptom och de påverkar vardagen negativt, bör vård sökas så snart som möjligt. Vid akuta situationer, som tankar på att skada sig själv eller andra, ska du kontakta psykiatrisk akutmottagning eller ringa 112."
          image="/images/bipolar/help-heart.webp"
          imageAlt="Person som sträcker ut en hand med ett hjärta"
        />

        <div className="flex flex-col content-container">
          <SectionTitle icon={<MdPsychology />}>
            Att känna igen när du behöver hjälp
          </SectionTitle>
          <p className="mb-4 ">
            Många personer med bipolär sjukdom kan ha svårt att inse hur mycket
            deras humörsvängningar påverkar dem själva och deras närstående.
            Särskilt under maniska perioder kan det vara svårt att se behovet av
            hjälp, då den ökade energin och kreativiteten kan upplevas som
            positiv.
          </p>
          <HighlightList
            title="Viktiga varningssignaler:"
            list={IMPORTANT_WARNING_SIGNS}
          />
          <p className="mt-6 ">
            Det är viktigt att komma ihåg att bipolär sjukdom är en
            behandlingsbar tillstånd, men det kräver professionell hjälp.
            Sjukdomen går inte över av sig själv.
          </p>
        </div>

        <RoundedImageWithList data={CHILDREN_YOUTH_SECTION_DATA} />

        <div className="flex flex-col content-container">
          <SectionTitle icon={<MdLocalHospital />}>
            Vid akuta situationer
          </SectionTitle>
          <p className="mb-4 ">
            Om du eller någon i din närhet har akuta självmordstankar eller
            planer på att skada sig själv är det viktigt att agera omedelbart.
            Du är inte ensam och det finns hjälp att få.
          </p>
          <div className="lightest-list-container">
            <h4 className="font-semibold text-primary-dark mb-3">
              Här kan du få akut hjälp:
            </h4>
            <ul className="flex flex-col gap-2 list-disc list-inside mb-4">
              {EMERGENCY_HELP_OPTIONS.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
            <p>
              Om du inte hittar det du söker kan du gå in på vår hjälpsida:
              <Link
                href="/akut"
                aria-label="Akut hjälp"
                className="nav-link ml-2 text-primary-dark"
              >
                Akut hjälp
              </Link>
            </p>
          </div>
        </div>
        <EncouragmentContainer text="Det är alltid bättre att söka hjälp en gång för mycket än en gång för lite. Vårdpersonal är van vid att möta personer i kris och finns där för att hjälpa utan att döma." />
        <RelatedLinks linksInfo={BIPOLAR_RELATED_LINKS} currentPage="symptom" />
      </div>
    </section>
  );
};

export default SymptomsPage;
