import MainLinkPageLayout from '../components/shared/PageLayout';
import { PAGE_LAYOUT_DATA } from '../data/pageLayoutLinks';

const HelpPage = () => {
  return <MainLinkPageLayout pageInfo={PAGE_LAYOUT_DATA.help} />;
};

export default HelpPage;
