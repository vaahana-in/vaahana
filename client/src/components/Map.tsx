// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState, useEffect } from "react";
import {
  CircleF,
  GoogleMap,
  MarkerF,
  LoadScript,
} from "@react-google-maps/api";
import logo from "../assets/motorbike.png";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

const Map = () => {
  // const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  const google = window.google;
  const randomData = [];

  const [currentLocation, setCurrentLocation] = useState(null);
  const [randomBikeData, setRandomBikeData] = useState([]);

  const [renderBikes, setRenderBikes] = useState(false);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });

          setTimeout(() => {
            setRenderBikes(true);
          }, 1000);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }

    currentLocation && generateRandomUserData();
  }, [renderBikes]);

  const bikeData = [
    {
      id: uuidv4(),
      name: "Honda CBR500R",
      imageUrl:
        "https://mcn-images.bauersecure.com/wp-images/5060/honda_cbr500r_01.jpg",
      ratePerHour: 15.99,
      brand: "Honda",
      type: "Sport Bike",
      year: 2022,
      engineDisplacement: "471cc",
      color: "Red",
      available: true,
      ownerName: faker.person.fullName(),
    },
    {
      id: uuidv4(),
      name: "Yamaha MT-07",
      imageUrl:
        "https://imgd.aeplcdn.com/1280x720/n/cw/ec/146941/mt-07-right-front-three-quarter.jpeg?isig=0",
      ratePerHour: 18.5,
      brand: "Yamaha",
      type: "Naked Bike",
      year: 2021,
      engineDisplacement: "689cc",
      color: "Blue",
      available: false,
      ownerName: faker.person.fullName(),
    },
    {
      id: uuidv4(),
      name: "Kawasaki Ninja 650",
      imageUrl:
        "https://imgd.aeplcdn.com/1280x720/n/cw/ec/154683/ninja-650-2023-right-front-three-quarter.jpeg?isig=0",
      ratePerHour: 20.75,
      brand: "Kawasaki",
      type: "Sport Tourer",
      year: 2023,
      engineDisplacement: "649cc",
      color: "Green",
      available: true,
      ownerName: faker.person.fullName(),
    },
    {
      id: uuidv4(),
      name: "Suzuki GSX-R750",
      imageUrl:
        "https://bd.gaadicdn.com/upload/userfiles/images/5f6882ef3a74c.jpg",
      ratePerHour: 22.99,
      brand: "Suzuki",
      type: "Sport Bike",
      year: 2022,
      engineDisplacement: "749cc",
      color: "Blue/White",
      available: true,
      ownerName: faker.person.fullName(),
    },
    {
      id: uuidv4(),
      name: "Ducati Monster 821",
      imageUrl:
        "https://images.carandbike.com/bike-images/colors/ducati/monster-821/ducati-monster-821-ducati-red.png?v=1578656239",
      ratePerHour: 25.5,
      brand: "Ducati",
      type: "Naked Bike",
      year: 2021,
      engineDisplacement: "821cc",
      color: "Red",
      available: false,
      ownerName: faker.person.fullName(),
    },
    {
      id: uuidv4(),
      name: "BMW R1250GS",
      imageUrl:
        "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20210705063618_GS.jpg",
      ratePerHour: 28.75,
      brand: "BMW",
      type: "Adventure Tourer",
      year: 2023,
      engineDisplacement: "1254cc",
      color: "Black",
      available: true,
      ownerName: faker.person.fullName(),
    },
    {
      id: uuidv4(),
      name: "Harley-Davidson Street Glide",
      imageUrl:
        "https://imgd.aeplcdn.com/1280x720/n/cw/ec/145691/street-glide-special-right-side-view.jpeg?isig=0",
      ratePerHour: 30.99,
      brand: "Harley-Davidson",
      type: "Touring Bike",
      year: 2022,
      engineDisplacement: "1746cc",
      color: "Silver",
      available: true,
      ownerName: faker.person.fullName(),
    },
    {
      id: uuidv4(),
      name: "KTM 390 Duke",
      imageUrl:
        "https://cloudfront-us-east-1.images.arcpublishing.com/octane/FEVN2LYLSVGTFE4FKU6SWF7QHQ.jpg",
      ratePerHour: 17.25,
      brand: "KTM",
      type: "Street Fighter",
      year: 2021,
      engineDisplacement: "373cc",
      color: "Orange",
      available: false,
      ownerName: faker.person.fullName(),
    },
  ];

  const findNearest = (arr, property) => {
    if (arr.length === 0) {
      return null;
    }

    return arr.reduce((nearest, current) => {
      return current[property] < nearest[property] ? current : nearest;
    }, arr[0]);
  };

  const generateRandomUserData = () => {
    for (let i = 0; i < bikeData.length; i++) {
      const radius = 1 / 1000; // 1 degree of latitude is approximately 111 km
      const randomLat =
        currentLocation.lat + (Math.random() - 0.5) * 4 * radius;
      const randomLng =
        currentLocation.lng + (Math.random() - 0.5) * 4 * radius;

      const distance = calculateDistance(currentLocation, {
        lat: randomLat,
        lng: randomLng,
      });
      bikeData[i].distance = distance;

      randomData.push({
        coordinates: { lat: randomLat, lng: randomLng },
        bikeData: bikeData[i],
      });
      setRandomBikeData(randomData);
      const nearestBike = randomData && findNearest(randomBikeData, "distance");
      if (nearestBike) {
        onBikeClick(nearestBike.bikeData);
      }
    }
  };

  const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Earth radius in kilometers

    const dLat = deg2rad(coord2.lat - coord1.lat);
    const dLng = deg2rad(coord2.lng - coord1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(coord1.lat)) *
        Math.cos(deg2rad(coord2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers

    return (distance * 1000).toFixed(2);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleMarkerClick = (bikeData) => {
    onBikeClick(bikeData);
  };

  const mapStyles = {
    height: "500px",
    width: "90%",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1vh",
      }}
    >
      {currentLocation && (
        <LoadScript googleMapsApiKey="">
          <GoogleMap
            mapContainerStyle={mapStyles}
            center={currentLocation}
            zoom={16}
          >
            <MarkerF key={"abc"} position={currentLocation} />
            <CircleF
              center={currentLocation}
              radius={500} // 1 km in meters
              options={{
                fillColor: "red",
                fillOpacity: 0.3,
                strokeColor: "black",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
              }}
            />
            {renderBikes &&
              randomBikeData.map((data, index) => (
                <MarkerF
                  icon={{
                    url: logo,
                    scaledSize: new google.maps.Size(30, 30),
                  }}
                  key={index}
                  position={data.coordinates}
                />
              ))}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default Map;
