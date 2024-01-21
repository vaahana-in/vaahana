import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { CheckCircleOutline, ThumbDown } from "@mui/icons-material";
import { Button, CircularProgress, Divider } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const Requests = () => {
  const { authToken } = useAuthContext();

  const [requests, setRequests] = useState(null);

  const getRequests = () => {
    axios
      .get("http://localhost:3000/request/owner", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setRequests(res.data);
      });
  };

  const handleApproveClick = (requestId, approval) => {
    axios
      .patch(
        `http://localhost:3000/request/${requestId}`,
        {
          approval,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          getRequests();
        }
      });
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <>
      {requests ? (
        <List>
          {requests.length > 0 ? (
            requests.map((req) => (
              <div>
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
                  {req.approval === "pending" ? (
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
                        onClick={() => handleApproveClick(req._id, "approved")}
                      >
                        <CheckCircleOutline />
                        <span style={{ color: "black", padding: "5px" }}>
                          approve
                        </span>
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleApproveClick(req._id, "denied")}
                      >
                        <ThumbDown color="warning" />
                        <span style={{ color: "black", padding: "5px" }}>
                          deny
                        </span>
                      </Button>
                    </div>
                  ) : (
                    <div>
                      {req.approval === "approved" ? (
                        <span>✅ approved</span>
                      ) : (
                        <span>👎 denied</span>
                      )}
                    </div>
                  )}
                </ListItem>
                <Divider />
              </div>
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
