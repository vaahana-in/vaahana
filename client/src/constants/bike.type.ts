export interface Bike {
  id: string;
  name: string;
  imageUrl: string;
  ratePerHour: number;
  brand: string;
  type: string;
  year: number;
  engineDisplacement: string;
  color: string;
  available: boolean;
  ownerName: string;
  coordinates?: { lat: number; lng: number };
  distance?: number;
}
