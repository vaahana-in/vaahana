import {
  Box,
  Container,
  List,
  Typography,
  CardContent,
  CardMedia,
  Card,
} from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { BikeResponse } from "../../constants/bike.type";
import {
  calculateDistance,
  getCurrentLocation,
} from "../../constants/bikes.data";
import Map from "../../components/Map";
import axios from "axios";

const Ride = () => {
  const [bikesRes, setBikesRes] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/bike").then(async (bikesRes) => {
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
      <Box>
        <Typography variant="body1" align="center" color="initial">
          {" "}
          Bikes Near You
        </Typography>
        <Typography variant="body2" align="center" color="initial">
          {" "}
          click to book
        </Typography>
      </Box>
      <Box style={{ height: "44vh", overflow: "scroll" }}>
        <List style={{ width: "100%" }}>
          {bikesRes &&
            bikesRes
              ?.sort((a, b) => a.distance! - b.distance!)
              .map((bike: BikeResponse, index) => (
                <Fragment key={index + 1}>
                  <Card>
                    <CardMedia
                      style={{ height: 170 }}
                      image={bike.image}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {bike.brand} {bike.model} {bike.makeYear}
                        {/* <Typography
                          variant="body2"
                          style={{ color: "grey", float: "right" }}
                        >
                          {bike.ownerName}
                        </Typography> */}
                      </Typography>
                      <Typography variant="body1" style={{ color: "navy" }}>
                        {bike.distance} m
                      </Typography>
                    </CardContent>
                  </Card>
                </Fragment>
              ))}
        </List>
      </Box>
    </Container>
  );
};

export default Ride;
