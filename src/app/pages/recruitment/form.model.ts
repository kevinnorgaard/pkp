export class Form {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  legacy?: boolean;
  year?: string;
  sports?: string;
  cumGpa?: string;
  prevGpa?: string;
  major?: string;
  minor?: string;
  achievements?: string;
  referral?: string;
  reasons?: string;
  group?: string;
  extraInfo?: string;
}
