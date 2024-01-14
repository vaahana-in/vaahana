import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { Bike } from "./bike.type";

interface Location {
  latitude: number;
  longitude: number;
}

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const getCurrentLocation = async (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error.message);
          reject({ latitude: null, longitude: null });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      reject({ latitude: null, longitude: null });
    }
  });
};

const calculateDistance = (coord1: Location, coord2: Location) => {
  const R = 6371; // Earth radius in kilometers

  const dLat = deg2rad(coord2.latitude! - coord1.latitude!);
  const dLng = deg2rad(coord2.longitude! - coord1.longitude!);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude!)) *
      Math.cos(deg2rad(coord2.latitude!)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return (distance * 1000).toFixed(2);
};

const generateAndAssignRandomDistance = async () => {
  const bikes: Bike[] = [
    {
      id: uuidv4(),
      name: "Honda CBR500R",
      imageUrl:
        "https://mcn-images.bauersecure.com/wp-images/5060/honda_cbr500r_01.jpg",
      ratePerMinute: 2,
      brand: "Honda",
      type: "Sport Bike",
      year: 2022,
      engineDisplacement: "471cc",
      color: "Red",
      available: true,
      ownerName: faker.person.fullName(),
      regNum: faker.vehicle.vin().slice(5),
    },
    {
      id: uuidv4(),
      name: "Yamaha MT-07",
      imageUrl:
        "https://imgd.aeplcdn.com/1280x720/n/cw/ec/146941/mt-07-right-front-three-quarter.jpeg?isig=0",
      ratePerMinute: 3,
      brand: "Yamaha",
      type: "Naked Bike",
      year: 2021,
      engineDisplacement: "689cc",
      color: "Blue",
      available: false,
      ownerName: faker.person.fullName(),
      regNum: faker.vehicle.vin().slice(5),
    },
    {
      id: uuidv4(),
      name: "Kawasaki Ninja 650",
      imageUrl:
        "https://imgd.aeplcdn.com/1280x720/n/cw/ec/154683/ninja-650-2023-right-front-three-quarter.jpeg?isig=0",
      ratePerMinute: 5,
      brand: "Kawasaki",
      type: "Sport Tourer",
      year: 2023,
      engineDisplacement: "649cc",
      color: "Green",
      available: true,
      ownerName: faker.person.fullName(),
      regNum: faker.vehicle.vin().slice(5),
    },
    {
      id: uuidv4(),
      name: "Suzuki GSX-R750",
      imageUrl:
        "https://bd.gaadicdn.com/upload/userfiles/images/5f6882ef3a74c.jpg",
      ratePerMinute: 4,
      brand: "Suzuki",
      type: "Sport Bike",
      year: 2022,
      engineDisplacement: "749cc",
      color: "Blue/White",
      available: true,
      ownerName: faker.person.fullName(),
      regNum: faker.vehicle.vin().slice(5),
    },
    {
      id: uuidv4(),
      name: "Ducati Monster 821",
      imageUrl:
        "https://images.carandbike.com/bike-images/colors/ducati/monster-821/ducati-monster-821-ducati-red.png?v=1578656239",
      ratePerMinute: 8,
      brand: "Ducati",
      type: "Naked Bike",
      year: 2021,
      engineDisplacement: "821cc",
      color: "Red",
      available: false,
      ownerName: faker.person.fullName(),
      regNum: faker.vehicle.vin().slice(5),
    },
    {
      id: uuidv4(),
      name: "BMW R1250GS",
      imageUrl:
        "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20210705063618_GS.jpg",
      ratePerMinute: 7,
      brand: "BMW",
      type: "Adventure Tourer",
      year: 2023,
      engineDisplacement: "1254cc",
      color: "Black",
      available: true,
      ownerName: faker.person.fullName(),
      regNum: faker.vehicle.vin().slice(5),
    },
    {
      id: uuidv4(),
      name: "Harley-Davidson Street Glide",
      imageUrl:
        "https://imgd.aeplcdn.com/1280x720/n/cw/ec/145691/street-glide-special-right-side-view.jpeg?isig=0",
      ratePerMinute: 13,
      brand: "Harley-Davidson",
      type: "Touring Bike",
      year: 2022,
      engineDisplacement: "1746cc",
      color: "Silver",
      available: true,
      ownerName: faker.person.fullName(),
      regNum: faker.vehicle.vin().slice(5),
    },
    {
      id: uuidv4(),
      name: "KTM 390 Duke",
      imageUrl:
        "https://cloudfront-us-east-1.images.arcpublishing.com/octane/FEVN2LYLSVGTFE4FKU6SWF7QHQ.jpg",
      ratePerMinute: 9,
      brand: "KTM",
      type: "Street Fighter",
      year: 2021,
      engineDisplacement: "373cc",
      color: "Orange",
      available: false,
      ownerName: faker.person.fullName(),
      regNum: faker.vehicle.vin().slice(5),
    },
  ];

  const { latitude, longitude } = await getCurrentLocation();
  for (let i = 0; i < bikes.length; i++) {
    const radius = 0.9 / 1000; // 1 degree of latitude is approximately 111 km
    const randomLat = latitude! + (Math.random() - 0.5) * 14 * radius;
    const randomLng = longitude! + (Math.random() - 0.5) * 14 * radius;

    const distance = calculateDistance(
      { latitude, longitude },
      {
        latitude: randomLat,
        longitude: randomLng,
      }
    );
    bikes[i].distance = parseFloat(distance);
    bikes[i].coordinates = { lat: randomLat, lng: randomLng };
  }
  return bikes;
};

const bikesData = await generateAndAssignRandomDistance();

export default bikesData;
