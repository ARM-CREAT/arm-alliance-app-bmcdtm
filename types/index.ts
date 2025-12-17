
export interface Member {
  id: string;
  name: string;
  role: string;
  location: string;
  phone: string;
  photo?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  author: string;
}

export interface Region {
  id: string;
  name: string;
  cercles: string[];
  communes: string[];
}

export interface ProgramSection {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface DonationOption {
  amount: number;
  label: string;
}

export interface MembershipForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  region: string;
  cercle: string;
  commune: string;
}
