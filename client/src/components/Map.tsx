import { useState, useEffect } from "react";
import {
  CircleF,
  GoogleMap,
  MarkerF,
  LoadScript,
  InfoWindowF,
} from "@react-google-maps/api";
import logo from "../assets/motorbike.png";
import { Bike, BikeResponse } from "../constants/bike.type";
import { useBikeContext } from "../context/BikeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { calculateDistance } from "../utils/helpers";
import { useAuthContext } from "../context/AuthContext";
const Map = () => {
  const google = window.google;
  const navigate = useNavigate();

  const { selectBike } = useBikeContext();

  const handleBikeClick = (selectedBike: Bike) => {
    selectBike(selectedBike);
    navigate("/walk");
  };

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [renderBikes, setRenderBikes] = useState(false);
  const [bikes, setBikes] = useState(null);
  const { authToken } = useAuthContext();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });

        authToken &&
          axios
            .get("http://localhost:3000/bike", {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            })
            .then(async (bikesRes) => {
              const bikesWithDistance = bikesRes.data.map(
                (bike: BikeResponse) => {
                  return {
                    ...bike,
                    distance: calculateDistance(
                      { latitude, longitude },
                      bike.location
                    ),
                    location: {
                      lat: bike.location.latitude,
                      lng: bike.location.longitude,
                    },
                  };
                }
              );

              setBikes(bikesWithDistance);
            });

        setTimeout(() => {
          setRenderBikes(true);
        }, 1000);
      });
    }
  }, [renderBikes]);

  const mapStyles = {
    height: "450px",
    width: "100%",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "7vh",
      }}
    >
      {currentLocation && (
        <LoadScript
          googleMapsApiKey={`${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`}
        >
          <GoogleMap
            mapContainerStyle={mapStyles}
            center={currentLocation}
            zoom={15}
          >
            <MarkerF key={"abc"} position={currentLocation} />
            <CircleF
              center={currentLocation}
              radius={1000} // 1 km in meters
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
            {bikes &&
              renderBikes &&
              bikes.map((bike, index: number) => {
                if (bike?.location) {
                  return (
                    <>
                      <MarkerF
                        icon={{
                          url: logo,
                          scaledSize: new google.maps.Size(30, 30),
                        }}
                        key={index}
                        position={bike?.location}
                        onClick={() => handleBikeClick(bike)}
                      >
                        <InfoWindowF position={bike?.location}>
                          <p style={{ padding: 0, margin: 0 }}>
                            {bike.distance} M
                          </p>
                        </InfoWindowF>
                      </MarkerF>
                    </>
                  );
                }
              })}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default Map;
