import MoodScoreScale from '@/app/components/dashboard/MoodScoreScale';
import BipolarDepression from '@/app/components/pages/bipolar/BipolarDepression';
import BipolarType from '@/app/components/pages/bipolar/BipolarType';
import DiagnosesChart from '@/app/components/pages/bipolar/DiagnosesChart';
import SchizoAffectiveDisorder from '@/app/components/pages/bipolar/SchizoAffectiveDisorder';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedContent from '@/app/components/shared/RelatedContent';
import { BIPOLAR_TYPES } from '@/app/data/bipolarDiagnoses';
import { diagnosisIntro } from '@/app/data/pageIntros';

const DiagnosesPage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={diagnosisIntro} />
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
      <RelatedContent currentPage="diagnoser" />
    </section>
  );
};

export default DiagnosesPage;
