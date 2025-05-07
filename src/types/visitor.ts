export interface Visitor {
  _id: string;
  visitorId: string;
  name: string;
  phone: string;
  purpose: string;
  category: 'Student' | 'Parent' | 'Vendor' | 'Guest';
  photoUrl?: string;
  visits: Visit[];
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Visit {
  _id: string;
  date: string;
  exitDate?: string | null;
}