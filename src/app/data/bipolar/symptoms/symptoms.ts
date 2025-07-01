import { HiInformationCircle } from 'react-icons/hi';

export const MANIC_SYMPTOMS = [
  'Överdrivet självförtroende: Personen kan känna sig grandios och osårbar',
  'Ökad energi och aktivitetsnivå: Man tar sig an flera projekt samtidigt, ofta utan att slutföra dem',
  'Minskat sömnbehov: Sömn upplevs som överflödigt; personen kan känna sig pigg efter bara ett par timmars sömn',
  'Snabbt och intensivt tal: Svårt för andra att avbryta eller hänga med',
  'Tankeflykt: Tankarna rusar, vilket kan leda till impulsiva beslut',
  'Riskfyllt beteende: Kan inkludera överdrivet spenderande, farliga situationer eller oansvarigt sexuellt beteende',
  'Irritabilitet: Personen kan snabbt bli frustrerad eller arg',
];

export const HYPOMANIC_SYMPTOMS = [
  'Förhöjt humör: Personen känner sig positiv och entusiastisk',
  'Ökad energi och kreativitet: Produktiviteten ökar, ofta i arbete eller hobbyprojekt',
  'Minskat sömnbehov: Mindre sömn behövs utan att känna trötthet',
  'Social utåtriktning: Personen kan vara mer pratglad och sällskaplig än vanligt',
];

export const DEPRESSIVE_SYMPTOMS = [
  'Ihållande nedstämdhet: Känslor av sorg, hopplöshet eller irritabilitet',
  'Förlorat intresse: Oförmåga att njuta av tidigare uppskattade aktiviteter',
  'Trötthet och energilöshet: Vardagsaktiviteter känns överväldigande',
  'Sömnstörningar: Svårigheter att somna, tidiga uppvaknanden eller överdriven sömn',
  'Ändrad aptit: Kan leda till viktförlust eller viktuppgång',
  'Koncentrationssvårigheter: Svårt att fatta beslut eller fokusera',
  'Tankar på döden: Återkommande tankar på döden eller självmord',
];

export const PSYCHOTIC_SYMPTOMS = [
  'Vanföreställningar: Personen kan tro att de har övermänskliga förmågor (vid mani) eller att de är förföljda (vid depression)',
  'Hallucinationer: Kan inkludera röster eller syner som inte är verkliga',
];

export const EARLY_WARNING_SIGNS = [
  'Sömnproblem (svårt att somna eller minskat sömnbehov)',
  'Förändrad aptit',
  'Ökad irritabilitet eller rastlöshet',
  'Ovanlig energinivå',
];

export const CHILDREN_YOUTH_SYMPTOMS = [
  {
    text: 'Snabbare humörsvängningar än hos vuxna',
  },
  {
    text: 'Mer frekventa episoder med kortare duration',
  },
  {
    text: 'Svårare att uttrycka känslor och upplevelser verbalt',
  },
  {
    text: 'Kan uppvisa irritabilitet snarare än klassisk mani eller depression',
  },
  {
    text: 'Symptom kan förväxlas med andra tillstånd som ADHD',
  },
];

export const IMPORTANT_WARNING_SIGNS = [
  'När humörsvängningar börjar påverka relationer negativt',
  'Om du fattar impulsiva beslut som får allvarliga konsekvenser',
  'När vardagliga rutiner blir svåra att upprätthålla',
  'Om du upplever återkommande perioder av hopplöshet',
];

export const EMERGENCY_HELP_OPTIONS = [
  'Ring 112 vid akuta situationer',
  'Kontakta närmaste psykiatriska akutmottagning',
  'Ring Mind Självmordslinjen på 90101',
  'Prata med en närstående som kan hjälpa dig söka vård',
];

export const CHILDREN_YOUTH_SECTION_DATA = {
  title: 'Symptom hos barn och ungdomar',
  desc: 'Bipolär sjukdom kan vara särskilt utmanande att identifiera hos barn och ungdomar. Det kan vara svårt att skilja mellan normala humörsvängningar under uppväxten och tecken på bipolär sjukdom.',
  image: '/images/bipolar/child.webp',
  imageAlt:
    'Ett barn som håller i två olika bilder med röda munnar, en ledsen och en glad',
  type: 'tertiary' as const,
  alignment: 'left' as const,
  listIcon: HiInformationCircle,
  listItems: CHILDREN_YOUTH_SYMPTOMS,
};
