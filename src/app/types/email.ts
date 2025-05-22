export interface IVerificationEmail {
  verificationToken: string;
  email: string;
}

export interface IContactEmail {
  name: string;
  email: string;
  message: string;
}

export interface IMedicationEmail {
  email: string;
  medication: string;
  time: string;
}
