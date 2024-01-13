export interface Bike {
  id: string;
  name: string;
  imageUrl: string;
  ratePerMinute: number;
  brand: string;
  type: string;
  year: number;
  engineDisplacement: string;
  color: string;
  available: boolean;
  ownerName: string;
  coordinates?: google.maps.LatLng | google.maps.LatLngLiteral;
  distance?: number;
  regNum: string;
}
