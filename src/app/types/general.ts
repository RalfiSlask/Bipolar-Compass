import { ColorType } from './colorTypes';

export interface IListItem {
  text: string;
}

export interface IRoundedImageWithListData {
  title?: string;
  desc: string;
  subdesc?: string;
  listItems: IListItem[];
  image: string;
  imageAlt: string;
  type?: ColorType;
  alignment?: 'left' | 'right';
  subTitle?: string;
  listIcon?: React.ComponentType<{ className?: string }>;
}

export interface IListWithLeftBorderListItem {
  id: number;
  title: string;
}

export interface IListWithLeftBorderContainer {
  id: number;
  title: string;
  description?: string;
  listItems: IListWithLeftBorderListItem[];
  type: ColorType;
}

export interface IContactCard {
  id: number;
  title: string;
  description: string;
  website: string;
  icon: React.ComponentType<{ className?: string }>;
  phone?: string;
}
