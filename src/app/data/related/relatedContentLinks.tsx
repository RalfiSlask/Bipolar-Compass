import { IRelatedLink } from '@/app/types/related';
import {
  BiBookHeart,
  BiBrain,
  BiConversation,
  BiFirstAid,
  BiMicrophone,
  BiMusic,
} from 'react-icons/bi';
import { FaQuestionCircle, FaUserShield } from 'react-icons/fa';
import { MdLocalMovies, MdOutlineWavingHand } from 'react-icons/md';

export const BIPOLAR_RELATED_LINKS = {
  title: 'Relaterat innehåll',
  description:
    'Utforska mer information om bipolär sjukdom genom dessa länkar.',
  links: [
    {
      id: 'vanliga-fragor',
      label: 'Vanliga frågor',
      href: '/bipolaritet/vanliga-fragor',
      icon: <FaQuestionCircle className="w-10 h-10" />,
      ariaLabel: 'Gå till vanliga frågor om bipolär sjukdom',
    },
    {
      id: 'symptom',
      label: 'Symptom',
      href: '/bipolaritet/symptom',
      icon: <MdOutlineWavingHand className="w-10 h-10" />,
      ariaLabel: 'Läs mer om symptom vid bipolär sjukdom',
    },
    {
      id: 'vad-ar-bipolaritet',
      label: 'Vad är bipolär sjukdom?',
      href: '/bipolaritet/vad-ar-bipolaritet',
      icon: <BiBrain className="w-10 h-10" />,
      ariaLabel: 'Lär dig mer om vad bipolär sjukdom är',
    },
    {
      id: 'diagnoser',
      label: 'Diagnoser',
      href: '/bipolaritet/diagnoser',
      icon: <BiBrain className="w-10 h-10" />,
      ariaLabel: 'Lär dig mer om diagnoser för bipolär sjukdom',
    },
  ] as IRelatedLink[],
};

export const TREATMENT_RELATED_LINKS = {
  title: 'Relaterat innehåll',
  description:
    'Utforska mer information om behandling av bipolaritet genom dessa länkar.',
  links: [
    {
      id: 'sjalvhjalp',
      label: 'Självhjälp',
      href: '/behandling/sjalvhjalp',
      icon: <BiBookHeart className="w-10 h-10" />,
      ariaLabel: 'Gå till självhjälp',
    },
    {
      id: 'terapi',
      label: 'Terapi',
      href: '/behandling/terapi',
      icon: <BiConversation className="w-10 h-10" />,
      ariaLabel: 'Läs mer om terapi',
    },
    {
      id: 'dokument',
      label: 'Verktyg & Dokument',
      href: '/behandling/dokument',
      icon: <BiBrain className="w-10 h-10" />,
      ariaLabel: 'Lär dig mer om verktyg & dokument',
    },
    {
      id: 'medicinska-behandlingar',
      label: 'Medicinska behandlingar',
      href: '/behandling/medicinska-behandlingar',
      icon: <BiFirstAid className="w-10 h-10" />,
      ariaLabel: 'Lär dig mer om medicinska behandlingar för bipolär sjukdom',
    },
  ] as IRelatedLink[],
};

export const MULTIMEDIA_RELATED_LINKS = {
  title: 'Relaterat innehåll',
  description: 'Fördjupa dig i fler medier som kan stödja och inspirera.',
  links: [
    {
      id: 'podcasts',
      label: 'Podcasts',
      href: '/multimedia/podcasts',
      icon: <BiMicrophone className="w-10 h-10" />,
      ariaLabel: 'Gå till podcasts',
    },
    {
      id: 'musik',
      label: 'Musik',
      href: '/multimedia/musik',
      icon: <BiMusic className="w-10 h-10" />,
      ariaLabel: 'Gå till musik',
    },
    {
      id: 'filmer',
      label: 'Filmer',
      href: '/multimedia/filmer',
      icon: <MdLocalMovies className="w-10 h-10" />,
      ariaLabel: 'Gå till filmer',
    },
  ] as IRelatedLink[],
};

export const HELP_RELATED_LINKS = {
  title: 'Relaterat innehåll',
  description: 'Utforska mer information om hjälp genom dessa länkar.',
  links: [
    {
      id: 'juridik-och-raattigheter',
      label: 'Juridik och rättigheter',
      href: '/hjalp/juridik-och-raattigheter',
      icon: <FaUserShield className="w-10 h-10" />,
      ariaLabel: 'Gå till juridik och rättigheter',
    },
    {
      id: 'myndigheter',
      label: 'Myndigheter',
      href: '/hjalp/myndigheter',
      icon: <BiBrain className="w-10 h-10" />,
      ariaLabel: 'Gå till myndigheter',
    },
    {
      id: 'ekonomisk-hjalp',
      label: 'Ekonomiskt stöd',
      href: '/hjalp/ekonomisk-hjalp',
      icon: <BiBookHeart className="w-10 h-10" />,
      ariaLabel: 'Gå till ekonomiskt stöd',
    },
  ] as IRelatedLink[],
};
