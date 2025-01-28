export interface IVerificationEmail {
  verificationToken: string;
  email: string;
}

export interface IContactEmail {
  name: string;
  email: string;
  message: string;
}
