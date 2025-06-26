import SectionTitle from '@/app/components/shared/headings/SectionTitle';
import Link from 'next/link';
import { MdPsychology } from 'react-icons/md';
import HighlightList from '../../components/shared/lists/HighlightList';

const CompulsoryCareSteps = () => {
  return (
    <div className="flex flex-col content-container">
      <SectionTitle icon={<MdPsychology />}>
        Hur går man tillväga för att ansöka om tvångsvård?
      </SectionTitle>
      <div className="flex flex-col gap-6 text-primary-dark">
        <div>
          <h4 className="font-semibold mb-2">Kontakta sjukvården</h4>
          <p>
            Om du misstänker att din närstående behöver tvångsvård ska du
            kontakta psykiatrin i din region. De flesta regioner har
            jourmottagningar för psykiatri som är öppna dygnet runt. Om
            situationen är akut kan du antigen söka hjälp via vår{' '}
            <Link
              href="/akut"
              className="nav-link text-primary-dark font-semibold"
            >
              akutsida {''}
            </Link>
            {''}
            eller direkt ringa{' '}
            <span className="text-primary-dark font-semibold">112</span>.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Beskriv situationen</h4>
          <p className="mb-4">
            Var tydlig när du pratar med vårdpersonal. Förklara varför du tror
            att din närstående behöver tvångsvård, till exempel om de:
          </p>
          <HighlightList
            list={[
              'Uppvisar farligt eller riskabelt beteende',
              'Har hallucinationer eller vanföreställningar',
              'Vägrar vård trots att de tydligt mår mycket dåligt',
            ]}
          />
        </div>
        <div>
          <h4 className="font-semibold mb-2">Läkarbedömning</h4>
          <p>
            En läkare behöver göra en bedömning för att fastställa om tvångsvård
            är nödvändig. Om läkaren anser att kriterierna för tvångsvård är
            uppfyllda, skrivs ett vårdintyg som är grunden för att personen ska
            kunna bli inlagd.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Beslut om tvångsvård</h4>
          <p>
            Efter att personen blivit inlagd måste en chefsöverläkare inom 24
            timmar besluta om tvångsvården ska fortsätta. Beslutet baseras på
            vårdintyget och en ny bedömning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompulsoryCareSteps;
