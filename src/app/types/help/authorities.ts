import { ColorType } from '../colorTypes';

interface IAuthorityService {
  title: string;
  description: string;
}

export interface IAuthority {
  name: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  contact?: string;
  services: IAuthorityService[];
  image?: string;
  type?: ColorType;
  logoAttribution?: string;
}
