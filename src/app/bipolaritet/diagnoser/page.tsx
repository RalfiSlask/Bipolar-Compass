import MoodScoreScale from '@/app/components/dashboard/MoodScoreScale';
import BipolarDepression from '@/app/components/pages/bipolar/BipolarDepression';
import BipolarType from '@/app/components/pages/bipolar/BipolarType';
import DiagnosesChart from '@/app/components/pages/bipolar/DiagnosesChart';
import SchizoAffectiveDisorder from '@/app/components/pages/bipolar/SchizoAffectiveDisorder';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedLinks from '@/app/components/shared/RelatedLinks';
import { BIPOLAR_TYPES } from '@/app/data/bipolar/bipolarDiagnoses';
import { DIAGNOSIS_INTRO } from '@/app/data/pageIntros';
import { BIPOLAR_RELATED_LINKS } from '@/app/data/related/relatedContentLinks';

const DiagnosesPage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={DIAGNOSIS_INTRO} />
      <div className="flex flex-col gap-4 sm:gap-10 items-center">
        {BIPOLAR_TYPES.map((type) => (
          <BipolarType key={type.title} bipolarType={type} />
        ))}
        <SchizoAffectiveDisorder />
        <DiagnosesChart />
        <BipolarDepression />
        <MoodScoreScale
          title="Bipolär Humörskala"
          scaleType="decimal"
          description="Denna skala illustrerar olika humörlägen och de beteenden som kan förekomma vid bipolär sjukdom, från depression till mani."
        />
      </div>
      <RelatedLinks linksInfo={BIPOLAR_RELATED_LINKS} currentPage="diagnoser" />
    </section>
  );
};

export default DiagnosesPage;
