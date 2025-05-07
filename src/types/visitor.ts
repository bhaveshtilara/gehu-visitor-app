export interface Visitor {
  _id: string; // Changed from ObjectId to string
  visitorId: string;
  name: string;
  phone: string;
  purpose: string;
  category: 'Student' | 'Parent' | 'Vendor' | 'Guest';
  photoUrl?: string;
  visits: Visit[];
  isBlocked: boolean;
  createdAt: string; // Changed from Date to string
  updatedAt: string; // Changed from Date to string
  __v?: number;
}

export interface Visit {
  _id: string; // Changed from ObjectId to string
  date: string; // Changed from Date to string
  exitDate?: string | null; // Changed from Date to string
}