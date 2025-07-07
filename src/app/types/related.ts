import { ReactNode } from 'react';

export interface IRelatedLink {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
  ariaLabel: string;
}

export interface IRelatedLinksInfo {
  title: string;
  description: string;
  links: IRelatedLink[];
}
