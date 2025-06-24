import AuthoritiesPageContent from '@/app/components/pages/help/authorities/AuthoritiesPageContent';
import PageIntroContainer from '@/app/components/shared/PageIntroContainer';
import RelatedLinks from '@/app/components/shared/RelatedLinks';
import { AUTHORITIES_INTRO } from '@/app/data/pageIntros';
import { HELP_RELATED_LINKS } from '@/app/data/related/relatedContentLinks';

const AuthoritiesPage = () => {
  return (
    <section className="page-section">
      <PageIntroContainer intro={AUTHORITIES_INTRO} />
      <AuthoritiesPageContent />
      <RelatedLinks linksInfo={HELP_RELATED_LINKS} currentPage="myndigheter" />
    </section>
  );
};

export default AuthoritiesPage;
