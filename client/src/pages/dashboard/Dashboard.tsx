import { Container } from "@material-ui/core";
// import Ride from '../ride/Ride'
import "./Dashboard.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

const buttonStyle = {
  display: "inline-block",
  padding: "10px 20px",
  margin: "10px",
  textDecoration: "none",
  color: "white",
  background: "blue",
  border: "1px solid blue",
  borderRadius: "5px",
};

function Dashboard() {
  const navigate = useNavigate();
  const { authToken } = useAuthContext();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken]);

  return (
    <Container
      className="container"
      style={{
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "85vh",
      }}
    >
      <NavLink style={buttonStyle} to="/lend">
        Lend
      </NavLink>
      <NavLink style={buttonStyle} to="/ride">
        Ride
      </NavLink>
    </Container>
  );
}

export default Dashboard;
