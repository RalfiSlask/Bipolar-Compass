import { ColorType } from '../colorTypes';

export interface IRowItem {
  title: string;
  id: number;
}

export interface ITableRow {
  id: number;
  cells: IRowItem[];
  bodyColor?: string;
  borderColor?: string;
}

export interface IImportantReminder {
  title: string;
  description: string;
  type: ColorType;
}

export interface IBank {
  id: number;
  title: string;
  type: ColorType;
  website?: string;
  phone?: string;
  image?: string;
}
