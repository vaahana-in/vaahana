import {
  Box,
  Container,
  List,
  Typography,
  CardContent,
  Card,
  CircularProgress,
} from "@material-ui/core";
import { useEffect, useState } from "react";

import Map from "../../components/Map";
import axios from "axios";
import { calculateDistance, getCurrentLocation } from "../../utils/helpers";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Ride.css";

const Ride = () => {
  const [bikesRes, setBikesRes] = useState(null);
  const { authToken } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/request/rider", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        if (res.data) {
          navigate("/booking-details");
        } else {
          axios
            .get("http://localhost:3000/bike", {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            })
            .then(async (bikesRes) => {
              const currentLocation = await getCurrentLocation();
              const bikesWithDistance = bikesRes.data.map((bike) => {
                bike.distance = calculateDistance(
                  currentLocation,
                  bike.location
                );
                return bike;
              });
              setBikesRes(bikesWithDistance);
            });
        }
      });
  }, [authToken, navigate]);

  return (
    <Container>
      <div className="container">
        {bikesRes ? (
          <>
            <div style={{ width: "90vw" }}>
              <Map key={`xyz`} />
            </div>
            <Box className="bikesContainer">
              {bikesRes
                ?.sort((a, b) => a.distance! - b.distance!)
                .map((bike, index) => (
                  <div className="bikeCard" key={`x-${index}`}>
                    <Card elevation={3}>
                      <CardContent>
                        <div>
                          <div>
                            <Typography variant="h6" component="div">
                              {bike.brand} {bike.model}
                            </Typography>
                            <Typography variant="body2">
                              {bike.licensePlate}
                            </Typography>
                            <Typography variant="body2">
                              {bike.pricePerMinute}
                            </Typography>
                          </div>
                          <div>
                            <img
                              style={{
                                float: "right",
                                width: "100%",
                                maxWidth: "300px",
                                height: "auto",
                              }}
                              src={bike.image}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </Box>
          </>
        ) : (
          <div className="spinnerContainer">
            <CircularProgress />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Ride;
