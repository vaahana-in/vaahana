import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { CheckCircleOutline, ThumbDown } from "@mui/icons-material";
import { Button, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const Requests = () => {
  const { authToken } = useAuthContext();

  const [requests, setRequests] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/request/owner", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setRequests(res.data);
      });
  }, []);

  return (
    <>
      {requests ? (
        <List>
          {requests.length > 0 ? (
            requests.map((req) => (
              <ListItem
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "100%",
                }}
                key={req._id}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={req.requesterId.name}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb9JsqxOgGFNVVKBMVmeCoU-G1W-rWUcb057f6NERgAYHHaJ8BknDGWXNyScS6v969bq0&usqp=CAU"
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={req.requesterId.name}
                  secondary={req.requesterId.address}
                />
                <ListItemText primary={`100 m away`} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <Button
                    style={{
                      color: "green",
                    }}
                    variant="contained"
                  >
                    <CheckCircleOutline />
                    <span style={{ color: "black", padding: "5px" }}>
                      approve
                    </span>
                  </Button>
                  <Button variant="contained">
                    <ThumbDown color="warning" />
                    <span style={{ color: "black", padding: "5px" }}>deny</span>
                  </Button>
                </div>
              </ListItem>
            ))
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
              <p>No requests found</p>
            </div>
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
    </>
  );
};

export default Requests;
