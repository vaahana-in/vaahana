import { useState, useEffect } from "react";
import {
  CircleF,
  GoogleMap,
  MarkerF,
  LoadScript,
} from "@react-google-maps/api";
import logo from "../assets/motorbike.png";
import { Bike } from "../constants/bike.type";
import { useBikeContext } from "../context/BikeContext";
import { useNavigate } from "react-router-dom";
const Map = () => {
  // const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  const google = window.google;
  const navigate = useNavigate();

  const { bikeData, selectBike } = useBikeContext();

  const handleBikeClick = (selectedBike: Bike) => {
    selectBike(selectedBike);
    navigate("/walk");
  };

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [renderBikes, setRenderBikes] = useState(false);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });

        setTimeout(() => {
          setRenderBikes(true);
        }, 1000);
      });
    }
  }, [renderBikes]);

  const mapStyles = {
    height: "500px",
    width: "100%",
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
            {bikeData &&
              renderBikes &&
              bikeData.map((bike: Bike, index: number) => {
                if (bike?.coordinates) {
                  return (
                    <MarkerF
                      icon={{
                        url: logo,
                        scaledSize: new google.maps.Size(30, 30),
                      }}
                      key={index}
                      position={bike?.coordinates}
                      onClick={() => handleBikeClick(bike)}
                    />
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
