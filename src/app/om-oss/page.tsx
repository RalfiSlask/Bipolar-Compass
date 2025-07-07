import MainLinkPageLayout from '../components/shared/PageLayout';
import { PAGE_LAYOUT_DATA } from '../data/pageLayoutLinks';

const AboutPage = () => {
  return <MainLinkPageLayout pageInfo={PAGE_LAYOUT_DATA.about} />;
};

export default AboutPage;
