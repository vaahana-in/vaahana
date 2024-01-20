import {
  Box,
  Container,
  List,
  Typography,
  CardContent,
  CardMedia,
  Card,
  CircularProgress,
} from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { BikeResponse } from "../../constants/bike.type";

import Map from "../../components/Map";
import axios from "axios";
import { calculateDistance, getCurrentLocation } from "../../utils/helpers";
import { useAuthContext } from "../../context/AuthContext";

const Ride = () => {
  const [bikesRes, setBikesRes] = useState(null);
  const { authToken } = useAuthContext();

  useEffect(() => {
    axios
      .get("http://localhost:3000/bike", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(async (bikesRes) => {
        const currentLocation = await getCurrentLocation();
        const bikesWithDistance = bikesRes.data.map((bike) => {
          bike.distance = calculateDistance(currentLocation, bike.location);
          return bike;
        });
        setBikesRes(bikesWithDistance);
      });
  }, []);

  return (
    <Container style={{ padding: 0 }}>
      <Box style={{ height: "55vh" }}>
        <Map />
      </Box>
      {/* <Box>
        <Typography variant="body1" align="center" color="initial">
          {" "}
          Bikes Near You
        </Typography>
        <Typography variant="body2" align="center" color="initial">
          {" "}
          click to book
        </Typography>
      </Box> */}
      {bikesRes ? (
        <Box style={{ height: "44vh", overflow: "scroll" }}>
          <List style={{ width: "100%" }}>
            {bikesRes
              ?.sort((a, b) => a.distance! - b.distance!)
              .map((bike: BikeResponse, index: number) => (
                <Fragment key={index + 1}>
                  <Card>
                    <CardMedia
                      style={{ height: 170 }}
                      image={bike.image}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        align="center"
                        component="div"
                      >
                        {bike.brand?.toUpperCase()} {bike.model?.toUpperCase()}{" "}
                        {bike.makeYear}
                        {/* <Typography
                          variant="body2"
                          style={{ color: "grey", float: "right" }}
                        >
                          {bike.ownerName}
                        </Typography> */}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <Typography variant="body1" style={{ color: "navy" }}>
                          {bike.distance} m
                        </Typography>
                        <Typography variant="body1" style={{ color: "navy" }}>
                          ₹ {bike.pricePerMinute} per minute
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Fragment>
              ))}
          </List>
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </Container>
  );
};

export default Ride;
