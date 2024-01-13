import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const RequestApproval = () => {
  const navigate = useNavigate();
  const handleRequestApproval = () => {
    navigate("/booking-details");
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
