export class Donation {
  name: string;
  email: string;
  affiliation ? = 'None';
  amount ? = 10;
  comment: string;
  time ?: Date;
}
