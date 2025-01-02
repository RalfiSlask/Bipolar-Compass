export interface IRegisterFormValues {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IUserFormValues {
  email: string;
}
