export interface IMenuItem {
  id: number;
  title: string;
  slug: string;
  submenuItems?: ISubmenuItem[];
  image?: string;
}

export interface ISubmenuItem {
  id: number;
  title: string;
  slug: string;
}
