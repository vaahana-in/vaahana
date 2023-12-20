import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
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
          {bikes?.map((bike: Bike, index) => (
            <React.Fragment key={bike.id + 1}>
              <ListItem key={index} alignItems="center">
                <ListItemAvatar>
                  <Avatar
                    style={{ width: "125px", height: "100px" }}
                    src={bike?.imageUrl}
                  />
                </ListItemAvatar>
                <ListItemText
                  style={{ marginLeft: "3vw" }}
                  primary={
                    <Typography variant="body1">{bike?.name}</Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        variant="body1"
                        style={{ float: "right", color: "MenuText" }}
                      >
                        300m
                      </Typography>
                      <Typography variant="body1">
                        {bike?.ratePerHour}/HR
                      </Typography>
                      <Typography variant="body2">{bike?.year}</Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider
                style={{ width: "100%", margin: 0 }}
                variant="inset"
                component="li"
              />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Ride;
