import { Container } from "@material-ui/core";
// import Ride from '../ride/Ride'
import "./Dashboard.css";
import { NavLink } from "react-router-dom";

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
  return (
    <Container
      className="container"
      style={{
        border: "1px dashed grey",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "98vh",
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
