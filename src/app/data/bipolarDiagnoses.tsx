import { BoltIcon } from '@/app/components/shared/icons/BoltIcon';
import { BulbIcon } from '@/app/components/shared/icons/BulbIcon';
import { SpinningArrowsIcon } from '@/app/components/shared/icons/SpinningArrowsIcon';
import { FaMixcloud, FaQuestion, FaSun, FaTachometerAlt } from 'react-icons/fa';

export interface IBipolarType {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  list: string[];
  imageUrl?: string;
}

export const BIPOLAR_TYPES: IBipolarType[] = [
  {
    title: 'Bipolär typ 1 (Bipolar I disorder)',
    subtitle: 'Karaktäristiska drag för mani',
    description:
      'Bipolär typ 1 kännetecknas av minst en episod av mani som varar i minst sju dagar eller kräver sjukhusvård på grund av svårighetsgraden. Maniska episoder är ofta intensiva och kan leda till impulsiva och riskfyllda beslut. Depression kan också förekomma mellan episoder av mani, men det är inte ett krav för diagnos.',
    icon: <BoltIcon className="w-6 h-6 text-primary-dark" />,
    list: [
      'Extremt förhöjt humör, överdriven energi eller agitation.',
      'Ökad självkänsla, ibland till storhetsvansinne.',
      'Snabba tankar och impulsivt beteende, som överdrivet spenderande eller farliga risker.',
      'Minskad sömnbehov, utan känsla av trötthet.',
      'Ökad pratsamhet, ofta med ett snabbt och pressat talmönster.',
      'Förlorad verklighetsuppfattning (psykos) i vissa fall.',
      'Maniska episoder påverkar ofta individens förmåga att fungera normalt i vardagen och kan leda till betydande sociala, juridiska och ekonomiska problem.',
    ],
  },
  {
    title: 'Bipolär typ 2 (Bipolar II disorder)',
    subtitle: 'Karaktäristiska drag för hypomani',
    description:
      'Denna form kännetecknas av minst en episod av hypomani och minst en episod av djup depression. Hypomani är en mildare form av mani som inte leder till allvarliga funktionsnedsättningar eller kräver sjukhusvård, men som fortfarande påverkar individens liv.',
    icon: <BulbIcon className="w-6 h-6 text-primary-dark" />,
    list: [
      'Förhöjt humör och ökad energi, men mindre intensivt än mani.',
      'Minskad sömnbehov, men inte lika extrem som vid mani.',
      'Impulsivt beteende, som att ta onödiga risker, dock mindre skadligt än vid mani.',
      'Ökad produktivitet och kreativitet, vilket kan uppfattas som positivt av individen själv.',
    ],
  },
  {
    title: 'Cyklotymi (Cyclothymic disorder)',
    subtitle: 'Karaktäristiska drag för cyklotymi',
    description:
      'Cyklotymi innebär att en person har regelbundna episoder av hypomaniliknande symtom och mildare depressiva episoder under minst två års tid (ett år för barn och ungdomar). Symtomen är inte tillräckligt allvarliga för att uppfylla kriterierna för bipolär typ 1 eller 2, men tillståndet kan vara störande och påverka livskvaliteten.',
    icon: <SpinningArrowsIcon className="w-6 h-6 text-primary-dark" />,
    list: [
      'Upprepade humörsvängningar, men utan att nå fullständig mani, hypomani eller djup depression.',
      'Episoderna kan vara korta men återkomma regelbundet.',
      'Svårigheter att upprätthålla stabila relationer och prestationer i arbete eller skola.',
      'Cyklotymi kan utvecklas till bipolär typ 1 eller 2 om den inte behandlas.',
    ],
  },
  {
    title: 'Bipolär sjukdom med blandade drag (Mixed features)',
    subtitle: 'Karaktäristiska drag för blandade episoder',
    description:
      'En blandad episod innebär att symtom på både mani (eller hypomani) och depression upplevs samtidigt. Detta kan vara särskilt förvirrande och påfrestande eftersom individen kan känna sig både extremt energisk och djupt hopplös på samma gång.',
    icon: <FaMixcloud className="w-6 h-6 text-primary-dark" />,
    list: [
      'Höga energinivåer och rastlöshet, kombinerat med en känsla av hopplöshet eller sorg.',
      'Snabba tankar och impulsivitet, tillsammans med tankar på självmord.',
      'Sömnproblem, med svårigheter att somna eller vakna tidigt.',
    ],
  },
  {
    title: 'Bipolär sjukdom med snabb cykling (Rapid cycling)',
    subtitle: 'Karaktäristiska drag för snabb cykling:',
    description:
      'Snabb cykling innebär att individen har minst fyra episoder av mani, hypomani, depression eller blandade tillstånd inom ett år. Denna variant kan vara särskilt svår att hantera eftersom humörsvängningarna sker i snabb följd.',
    icon: <FaTachometerAlt className="w-6 h-6 text-primary-dark" />,
    list: [
      'Episoderna kan vara korta (flera dagar) eller långa (veckor till månader).',
      'Kvinnor är mer benägna att drabbas av snabb cykling än män.',
      'Tillståndet kan vara tillfälligt och utlösas av stress, hormonella förändringar eller medicinavbrott.',
    ],
  },
  {
    title: 'Bipolär sjukdom med säsongsrelaterade drag (Seasonal pattern)',
    subtitle: 'Karaktäristiska drag för säsongsrelaterade mönster',
    description:
      'Denna form av bipolär sjukdom innebär att humöret påverkas av årstiderna. Vanligtvis inträffar depression under höst och vinter, medan mani eller hypomani uppstår under våren och sommaren.',
    icon: <FaSun className="w-6 h-6 text-primary-dark" />,
    list: [
      'Depression under mörkare månader, med symptom som trötthet, hopplöshet och minskat intresse för aktiviteter.',
      'Mani eller hypomani under ljusare månader, med symptom som ökad energi, förhöjt humör och minskat sömnbehov.',
      'Denna typ av bipolär sjukdom kan förväxlas med säsongsbunden depression (SAD), men bipolär sjukdom med säsongsdrag kan också inkludera maniska eller hypomaniska episoder.',
    ],
  },
  {
    title: 'Ospecificerad bipolär sjukdom (Unspecified bipolar disorder)',
    subtitle: 'Karaktäristiska drag för ospecificerad bipolär sjukdom',
    description:
      'Denna kategori används när symtomen inte helt passar in i någon av de andra typerna, men ändå orsakar betydande problem för individen. Exempelvis kan symtomen vara mindre tydliga, ha en ovanlig presentation eller utlösas av en specifik medicinsk eller substansrelaterad orsak.',
    icon: <FaQuestion className="w-6 h-6 text-primary-dark" />,
    list: [
      'Symtomen uppfyller inte helt kriterierna för bipolär typ 1 eller 2',
      'Kan ha ovanlig presentation eller varaktighet av episoder',
      'Kan utlösas av medicinska tillstånd eller substansbruk',
      'Orsakar fortfarande betydande problem i vardagen',
    ],
  },
];
