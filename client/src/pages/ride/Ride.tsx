import {
  Box,
  Container,
  List,
  Typography,
  CardContent,
  CardMedia,
  Card,
} from "@material-ui/core";
import * as React from "react";
import { Bike } from "../../constants/bike.type";
import bikes from "../../constants/bikes.data";
import Map from "../../components/Map";

const Ride = () => {
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
          {bikes?.map((bike: Bike) => (
            <React.Fragment key={bike.id + 1}>
              <Card>
                <CardMedia
                  style={{ height: 170 }}
                  image={bike.imageUrl}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {bike.name}
                    <Typography
                      variant="body2"
                      style={{ color: "grey", float: "right" }}
                    >
                      {bike.ownerName}
                    </Typography>
                  </Typography>
                  <Typography variant="body1" style={{ color: "navy" }}>
                    {bike.distance} m
                  </Typography>
                </CardContent>
              </Card>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Ride;
