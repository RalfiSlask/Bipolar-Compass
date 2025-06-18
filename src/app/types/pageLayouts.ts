export interface IPageLayoutData {
  title: string;
  description: string;
  subDescription: string;
  links: {
    title: string;
    href: string;
    description: string;
    image: string;
  }[];
}
