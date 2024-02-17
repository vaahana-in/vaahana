import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./BookingDetails.css";

const BookingDetails = () => {
  const handlePayClick = () => {
    console.log("handlePayClick clicked");
  };

  const { authToken } = useAuthContext();

  const [requestDetails, setRequestDetails] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);

  const navigate = useNavigate();

  const deleteRequest = (requestId: string) => {
    axios
      .delete(`http://localhost:3000/request/${requestId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/ride");
        }
      });
  };

  const handleViewOtherBikes = (requestId: string) => {
    deleteRequest(requestId);
  };

  const handleDeleteRequest = (requestId: string) => {
    deleteRequest(requestId);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/request/rider`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((requestRes) => {
        if (requestRes.data) {
          setRequestDetails(requestRes.data);
          const { hours, minutes } = calculateTimeDifference(requestRes.data);
          setHours(hours);
          setMinutes(minutes);
        }
      });
  }, []);

  const parseTime = (timeString: string) => moment(timeString, "h:mm A");

  const calculateTimeDifference = (requestDetails) => {
    const fromTime = parseTime(requestDetails.from);
    const toTime = parseTime(requestDetails.to);

    if (fromTime.isValid() && toTime.isValid()) {
      const difference = moment.duration(toTime.diff(fromTime));
      return { hours: difference.hours(), minutes: difference.minutes() };
    } else {
      return "Invalid time format";
    }
  };

  return (
    requestDetails && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "92vh",
          marginTop: "7vh",
        }}
      >
        <h3 style={{ marginTop: "3vh", marginBottom: 0 }}>Your Requests</h3>
        <p>Delete current request to make new request</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            height: "15%",
            background: "lightblue",
            textAlign: "center",
          }}
        >
          <div>
            <div>{requestDetails.bikeId?.licensePlate}</div>
            <div>
              {requestDetails.bikeId?.brand} {requestDetails.bikeId?.model}
            </div>
          </div>
          <div>
            {requestDetails.from} to {requestDetails.to}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div>Owner Approval</div>
            {requestDetails && (
              <div>
                {requestDetails.approval === "pending"
                  ? "Pending"
                  : requestDetails.approval === "approved"
                  ? "✅"
                  : "👎"}
              </div>
            )}
          </div>
        </div>
        <div className="bikeImage">
          <img
            style={{ width: "inherit", height: "100%" }}
            src={requestDetails.bikeId?.image}
            alt=""
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "35%",
            background: "antiquewhite",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={{ color: "red" }}>
              ₹ {(hours * 60 + minutes) * requestDetails.bikeId.pricePerMinute!}
            </h2>
            <span>
              for {hours} hours and {minutes} minutes
            </span>
          </div>

          <Button
            variant="contained"
            style={{ color: "black", margin: 20 }}
            onClick={handlePayClick}
            disabled={
              requestDetails.approval === "denied" ||
              requestDetails.approval === "pending"
            }
          >
            Make Payment
          </Button>
          {requestDetails.approval === "denied" && (
            <Button
              variant="contained"
              style={{ color: "black", margin: 20 }}
              onClick={() => handleViewOtherBikes(requestDetails._id)}
            >
              View other bikes
            </Button>
          )}
        </div>
        <Button
          variant="contained"
          style={{ color: "black", margin: 20 }}
          onClick={() => handleDeleteRequest(requestDetails._id)}
          disabled={!requestDetails.approval}
        >
          <Delete />
        </Button>
      </div>
    )
  );
};

export default BookingDetails;
