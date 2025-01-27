export const threeSections = [
  {
    title: 'Jag är nydiagnostiserad',
    description:
      'Du ska veta att du inte är ensam då 60 miljoner människor världen över level med bipolär sjukdom. Vi är här för att hjälpa dig.',
    bgColor: 'bg-primary-dark',
    textColor: 'text-white',
    buttonVariant: 'secondary',
    href: '/bipolaritet/vad-ar-bipolaritet',
  },
  {
    title: 'Jag forskar om bipolaritet',
    description:
      'Om du är forskare vill vi tacka för ditt engagemang och du kan hitta den senaste forskningen om bipolär sjukdom här.',
    bgColor: 'bg-secondary-light',
    textColor: 'text-primary-dark',
    buttonVariant: 'primary',
    href: '/forskning',
  },
  {
    title: 'Jag är anhörig',
    description:
      'Om du är anhörig till en person med bipolär sjukdom kan du hjälpa oss att hjälpa andra',
    bgColor: 'bg-tertiary-light',
    textColor: 'text-tertiary-dark',
    buttonVariant: 'tertiary',
    href: '/anhoriga',
  },
] as const;
