export interface IFaqItem {
  question: string;
  answer: string;
  links?: { text: string; href: string }[];
  additionalText?: string;
  id: string;
  open: boolean;
}
