import { BiMovie, BiPodcast } from 'react-icons/bi';
import { BsMusicNote, BsPlayCircle } from 'react-icons/bs';

export const multimediaLinks = [
  {
    title: 'Filmer',
    href: '/multimedia/filmer',
    description:
      'Se filmer med kända skådespelare om bipolär sjukdom och dess påverkan',
    icon: (
      <div className="p-3 rounded-full bg-purple-100 shadow-lg ring-2 ring-purple-500/20">
        <BiMovie className="w-12 h-12 text-purple-500" />
      </div>
    ),
  },
  {
    title: 'Musik',
    href: '/multimedia/musik',
    description:
      'Lyssna på våra olika spellistor från spotify som passar för olika sinnestillstånd',
    icon: (
      <div className="p-3 rounded-full bg-indigo-100 shadow-lg ring-2 ring-indigo-500/20">
        <BsMusicNote className="w-12 h-12 text-indigo-500" />
      </div>
    ),
  },
  {
    title: 'Podcasts',
    href: '/multimedia/podcasts',
    description: 'Utforska podcasts om bipolär sjukdom och mental hälsa',
    icon: (
      <div className="p-3 rounded-full bg-green-100 shadow-lg ring-2 ring-green-500/20">
        <BiPodcast className="w-12 h-12 text-green-500" />
      </div>
    ),
  },
  {
    title: 'Videor',
    href: '/multimedia/videor',
    description: 'Se videor med information och personliga berättelser',
    icon: (
      <div className="p-3 rounded-full bg-teal-100 shadow-lg ring-2 ring-teal-500/20">
        <BsPlayCircle className="w-12 h-12 text-teal-500" />
      </div>
    ),
  },
];
