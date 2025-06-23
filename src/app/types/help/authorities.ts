import { ColorType } from '../colorTypes';

export interface IAuthorityService {
  id: number;
  title: string;
  description: string;
}

export interface IAuthority {
  title: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  contact?: string;
  services: IAuthorityService[];
  image?: string;
  type?: ColorType;
  logoAttribution?: string;
  imageReplacementText?: string; // If we have not been authorized to use the image, we use this text of the authority name to display instead.
}
