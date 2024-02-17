import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  List,
  Tabs,
  Typography,
} from "@material-ui/core";
import { LibraryAdd, Delete, Edit, History } from "@mui/icons-material";
import Requests from "../../components/Requests";
import AddBike from "../../components/AddBike";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { BikeResponse } from "../../constants/bike.type";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Lend() {
  const [value, setValue] = useState(1);

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
      .get(`${import.meta.env.VITE_APP_PUBLIC_SERVER_URL}/bike/owner`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        res.data && setYourBikes(res.data);
      });
  }, [authToken]);

  return (
    <Box sx={{ width: "100%", marginTop: "8vh" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label="Your Bikes" {...a11yProps(0)} />
          <Tab label="Requests" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box style={{ width: "100%", overflow: "scroll", textAlign: "center" }}>
          {yourBikes ? (
            <List style={{ width: "100%" }}>
              {yourBikes?.length > 0 ? (
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
                ))
              ) : (
                <p>You have not added any bike</p>
              )}
            </List>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "50vh",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </Box>
        <Button onClick={handleDialogOpen} style={{ float: "right" }}>
          <LibraryAdd fontSize="large" />
        </Button>
        <AddBike open={dialogOpen} onClose={handleDialogClose} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Requests />
      </CustomTabPanel>
    </Box>
  );
}
