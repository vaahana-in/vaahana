// export interface Bike {
//   id: string;
//   name: string;
//   imageUrl: string;
//   ratePerMinute: number;
//   brand: string;
//   type: string;
//   year: number;
//   engineDisplacement: string;
//   color: string;
//   available: boolean;
//   ownerName: string;
//   coordinates?: google.maps.LatLng | google.maps.LatLngLiteral;
//   distance?: number;
//   regNum: string;
// }

export interface Bike {
  brand: string | undefined;
  model: string | undefined;
  makeYear: string | number | undefined; // Year can be a string or a number
  licensePlate: string | undefined;
  location: {
    latitude: number | string | undefined;
    longitude: number | string | undefined;
  };
  availability: boolean | undefined; // Is the motorbike currently available for rent?
  pricePerMinute: number | undefined; // Cost of renting the motorbike per minute
  image: string | undefined; // Array of image URLs
  distance?: number;
}

export interface BikeResponse extends Bike {
  _id: string;
  ownerId: string; // ID of the owner/user who listed the motorbike
  color: string;
  description: string;
  features: string[]; // Array of additional features or attributes
  rating: number; // Average rating given by users who rented the motorbike
  reviews: {
    userId: string; // ID of the user who left the review
    text: string;
    rating: number; // Rating given by the user
    date: string; // Date of the review
  }[];
  rentalHistory: {
    userId: string; // ID of the user who rented the motorbike
    startDate: string;
    endDate: string;
    totalCost: number;
  }[];
}
