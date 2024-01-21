import { Button } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useBikeContext } from "../context/BikeContext";

const RequestApproval = () => {
  const { authToken } = useAuthContext();
  const { bookingHours, selectedBike } = useBikeContext();

  const navigate = useNavigate();
  const handleRequestApproval = () => {
    axios
      .post(
        "http://localhost:3000/request",
        {
          bikeId: selectedBike._id,
          from: bookingHours.from,
          to: bookingHours.to,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((requestRes) => {
        if (requestRes.data.success) {
          navigate("/booking-details");
        }
      });
  };

  return (
    <Button
      variant="contained"
      style={{ background: "blue", color: "white", margin: 20 }}
      onClick={handleRequestApproval}
    >
      Request Approval
    </Button>
  );
};

export default RequestApproval;
