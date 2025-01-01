export interface IMenuItem {
  id: number;
  title: string;
  slug: string;
  submenuItems?: ISubmenuItem[];
}

export interface ISubmenuItem {
  id: number;
  title: string;
  slug: string;
}
