import { BsChatSquareHeart, BsFileEarmarkText } from 'react-icons/bs';
import { GiBrain } from 'react-icons/gi';
import { RiMedicineBottleLine } from 'react-icons/ri';

export const treatmentLinks = [
  {
    title: 'Medicin',
    href: '/behandling/medicin',
    description:
      'Läs om olika typer av medicin som kan hjälpa vid bipolär sjukdom',
    icon: (
      <div className="p-3 rounded-full bg-green-100 shadow-lg ring-2 ring-green-500/20">
        <RiMedicineBottleLine className="w-12 h-12 text-green-500" />
      </div>
    ),
  },
  {
    title: 'Självhjälp',
    href: '/behandling/sjalvhjalp',
    description:
      'Läs om olika självhjälpsmetoder som kan hjälpa vid bipolär sjukdom',
    icon: (
      <div className="p-3 rounded-full bg-rose-100 shadow-lg ring-2 ring-rose-500/20">
        <GiBrain className="w-12 h-12 text-rose-500" />
      </div>
    ),
  },
  {
    title: 'Terapi',
    href: '/behandling/terapi',
    description:
      'Läs om olika typer av terapi som kan hjälpa vid bipolär sjukdom',
    icon: (
      <div className="p-3 rounded-full bg-red-100 shadow-lg ring-2 ring-red-500/20">
        <BsChatSquareHeart className="w-12 h-12 text-red-500" />
      </div>
    ),
  },
  {
    title: 'Verktyg & Dokument',
    href: '/behandling/dokument',
    description:
      'Ladda ner krisplaner, självskattningsformulär och andra behandlingsverktyg',
    icon: (
      <div className="p-3 rounded-full bg-lime-100 shadow-lg ring-2 ring-lime-500/20">
        <BsFileEarmarkText className="w-12 h-12 text-lime-500" />
      </div>
    ),
  },
];
