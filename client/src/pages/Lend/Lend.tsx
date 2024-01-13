import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  Typography,
} from "@material-ui/core";
import bikes from "../../constants/bikes.data";
import { Bike } from "../../constants/bike.type";
import { LibraryAdd, Delete, Edit } from "@mui/icons-material";
import Requests from "../../components/Requests";

export default function Lend() {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [yourBikes, setYourBikes] = useState<Bike[]>(bikes);

  useEffect(() => {
    setYourBikes(bikes.splice(0, 2));
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Your Bikes" style={{ width: "50%" }} value="1" />
            <Tab label="Requests" style={{ width: "50%" }} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box
            style={{ width: "100%", overflow: "scroll", textAlign: "center" }}
          >
            <p>Click on bike to view details</p>
            <List style={{ width: "100%" }}>
              {yourBikes.map((bike: Bike) => (
                <React.Fragment key={bike.id + 1}>
                  <Card>
                    <CardMedia
                      style={{ height: 200 }}
                      image={bike.imageUrl}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {bike.name}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button>
                          <Delete />
                        </Button>
                        <Button>
                          <Edit />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </React.Fragment>
              ))}
            </List>
          </Box>
          <Button style={{ float: "right" }}>
            <LibraryAdd fontSize="large" />
          </Button>
        </TabPanel>
        <TabPanel value="2">
          <Requests />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
