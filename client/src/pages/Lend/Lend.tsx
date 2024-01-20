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
import { LibraryAdd, Delete, Edit, History } from "@mui/icons-material";
import Requests from "../../components/Requests";
import AddBike from "../../components/AddBike";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { BikeResponse } from "../../constants/bike.type";

export default function Lend() {
  const [value, setValue] = useState("1");

  const [dialogOpen, setDialogOpen] = useState(false);

  const { authToken } = useAuthContext();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [yourBikes, setYourBikes] = useState<BikeResponse[] | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/bike", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setYourBikes(res.data);
      });
  }, [authToken]);

  return (
    <Box sx={{ width: "100%", typography: "body1", marginTop: "7vh" }}>
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
            <List style={{ width: "100%" }}>
              {yourBikes &&
                yourBikes.map((bike: BikeResponse, index: number) => (
                  <React.Fragment key={index + 1}>
                    <Card>
                      <CardMedia
                        style={{ height: 180 }}
                        image={bike.image}
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {bike.brand?.toUpperCase()}{" "}
                          {bike.model?.toUpperCase()} {bike.makeYear}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button>
                            <History />
                          </Button>
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
          <Button onClick={handleDialogOpen} style={{ float: "right" }}>
            <LibraryAdd fontSize="large" />
          </Button>
          <AddBike open={dialogOpen} onClose={handleDialogClose} />
        </TabPanel>
        <TabPanel value="2">
          <Requests />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
