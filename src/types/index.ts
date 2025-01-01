export interface Applicant {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: string;
  phoneNumber: string;
  linkedinUrl: string;
  applyFor: string[];
  otherPosition?: string;
  currentCompanies: string[];
  yearsOfExperience: number;
  language: string;
  resume: string | null;
  nationalIdImage: string | null;
  certificates: Certificate[];
}

export interface Certificate {
  id: string;
  name: string;
  file: string;
}