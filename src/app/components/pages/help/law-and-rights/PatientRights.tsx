import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import LinkWithArrow from '@/app/components/shared/links/LinkWithArrow';
import HighlightList from '@/app/components/shared/lists/HighlightList';
import {
  JOURNAL_HANDLING_LINKS,
  LAW_RIGHTS_LINKS,
} from '@/app/data/help/lawRights';
import { FaUserMd } from 'react-icons/fa';

const PatientRights = () => {
  return (
    <div className="content-container">
      <SectionTitle icon={<FaUserMd />}>Patienträttigheter</SectionTitle>
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="font-semibold text-lg mb-4">
            Dina rättigheter enligt Patientlagen
          </h4>
          <p className="mb-4">
            Enligt Patientlagen (2014:821) har du som patient flera viktiga
            rättigheter:
          </p>
          <HighlightList list={LAW_RIGHTS_LINKS} />
          <div className="mt-4">
            <LinkWithArrow
              link="https://www.1177.se/sa-fungerar-varden/var-med-och-bestam-om-din-vard/patientlagen/"
              text="Läs mer om patienträttigheter på 1177"
            />
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4">Journalhantering</h4>
          <p className="mb-4">
            Du har rätt att ta del av din journal och begära ändringar om
            informationen är felaktig. För att begära ut din journal kan du:
          </p>
          <HighlightList list={JOURNAL_HANDLING_LINKS} />
          <div className="mt-4">
            <LinkWithArrow
              link="https://www.1177.se/sa-fungerar-varden/sa-skyddas-och-hanteras-dina-uppgifter/din-journal/"
              text="Läs mer om journalhantering på 1177"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRights;
