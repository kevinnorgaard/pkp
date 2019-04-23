export class Donation {
  donation_id ?: string;
  id: string;
  anonymous = false;
  affiliation ? = 'None';
  amount = 10;
  comment ? = 'For the kids!';
  time ?: Date;
}

export class Donor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
