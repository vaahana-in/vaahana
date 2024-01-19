import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  MarkerF,
} from "@react-google-maps/api";
import logo from "../assets/motorbike.png";
import { Button, Container, Divider } from "@material-ui/core";
import { useBikeContext } from "../context/BikeContext";
import SelectTime from "./SelectTime";
import SelectedBikeInfo from "./SelectedBikeInfo";
import CallOwner from "./CallOwner";
import RequestApproval from "./RequestApproval";

type WalkRouteMapComponentProps = {
  userLocation: { lat: number; lng: number };
};

const WalkRouteMap: React.FC<WalkRouteMapComponentProps> = ({
  userLocation,
}) => {
  const [directions, setDirections] = useState(null);
  const { selectedBike } = useBikeContext();
  useEffect(() => {
    setTimeout(() => {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: new window.google.maps.LatLng(
            userLocation.lat,
            userLocation.lng
          ),
          destination: new window.google.maps.LatLng(
            selectedBike.location.lat,
            selectedBike.location.lng
          ),
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }, 2000);
  }, [userLocation, selectedBike]);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        height: "98vh",
      }}
    >
      <Container
        style={{ height: "100%", width: "100%", margin: 0, padding: 0 }}
      >
        <LoadScript
          googleMapsApiKey={`${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`}
        >
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "500px" }}
            center={userLocation}
            zoom={13}
          >
            {directions && (
              <>
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    suppressMarkers: true,
                    polylineOptions: {
                      strokeColor: "#ff0000", // You can customize the color of the route
                    },
                  }}
                />
                <MarkerF
                  icon={{
                    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb9JsqxOgGFNVVKBMVmeCoU-G1W-rWUcb057f6NERgAYHHaJ8BknDGWXNyScS6v969bq0&usqp=CAU",
                    scaledSize: new google.maps.Size(30, 30),
                  }}
                  position={userLocation}
                />
                <MarkerF
                  icon={{
                    url: logo,
                    scaledSize: new google.maps.Size(30, 30),
                  }}
                  position={selectedBike.location}
                />
              </>
            )}
          </GoogleMap>
        </LoadScript>

        <Button
          variant="contained"
          style={{ background: "blue", color: "white" }}
        >
          Start Navigation
        </Button>
      </Container>

      <Divider />
      <Container
        style={{
          height: "25%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <label>Select Time</label>
          <SelectTime />
        </div>

        <SelectedBikeInfo />
      </Container>
      <Container
        style={{
          height: "25%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CallOwner />
        <RequestApproval />
      </Container>
    </Container>
  );
};

export default WalkRouteMap;
