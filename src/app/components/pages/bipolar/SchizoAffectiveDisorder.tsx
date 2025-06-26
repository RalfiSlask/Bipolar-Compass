import { FaUserMd } from 'react-icons/fa';
import SectionTitle from '../../shared/headings/SectionTitle';

const SchizoAffectiveDisorder = () => {
  return (
    <div className="flex flex-col content-container">
      <SectionTitle icon={<FaUserMd />} type="tertiary">
        Schizoaffektivt syndrom
      </SectionTitle>
      <p className="mb-6 text-dark">
        Schizoaffektivt syndrom är ett psykiskt tillstånd som kombinerar symtom
        från schizofreni (som psykos, hallucinationer eller vanföreställningar)
        med symtom på en humörstörning, antingen depression eller mani. Det kan
        ibland förväxlas med bipolär sjukdom, särskilt om de psykotiska symtomen
        bara uppträder under humörepisoner.
      </p>
      <p className="mb-6 text-dark">
        Schizoaffektivt syndrom kan vara svårt att diagnosticera, eftersom det
        delar likheter med både schizofreni och bipolär sjukdom. Det är viktigt
        att en erfaren psykiatriker gör en noggrann bedömning baserad på
        tidslinjen för symtom och deras samband.
      </p>

      <div className="bg-tertiary-light rounded-md p-4 flex flex-col gap-4 shadow-md shadow-tertiary-dark/20">
        <div>
          <h5 className="font-semibold text-tertiary-dark mb-3">
            Typer av schizoaffektivt syndrom:
          </h5>
          <ul className="flex flex-col gap-2 list-disc list-inside text-dark">
            <li>
              Bipolär typ: Symtomen inkluderar maniska eller blandade episoder,
              med eller utan depression.
            </li>
            <li>
              Depressiv typ: Symtomen inkluderar endast depression tillsammans
              med psykos.
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-tertiary-dark mb-3">
            Skillnad mot bipolär sjukdom:
          </h5>
          <ul className="flex flex-col gap-2 list-disc list-inside text-dark">
            <li>
              Vid bipolär sjukdom uppträder psykotiska symtom (som
              hallucinationer eller vanföreställningar) endast under mani eller
              djup depression.
            </li>
            <li>
              Vid schizoaffektivt syndrom förekommer psykotiska symtom även
              utanför humörepisoder.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SchizoAffectiveDisorder;
