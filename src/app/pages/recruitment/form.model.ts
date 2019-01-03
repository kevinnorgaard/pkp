export class Form {

  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public socialMedia?: { facebook?: string, instagram?: string, linkedin?: string },
    public legacy?: boolean,
    public year?: string,
    public sports?: string,
    public cumGpa?: string,
    public prevGpa?: string,
    public major?: string,
    public minor?: string,
    public achievements?: string,
    public referral?: string,
    public reasons?: string,
    public group?: string,
    public extraInfo?: string
  ) {  }

}