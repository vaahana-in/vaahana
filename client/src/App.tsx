import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Ride from "./pages/ride/Ride";
import WalkRouteMap from "./components/WalkRouteMap";
import BookingDetails from "./pages/booking-details/BookingDetails";
import Lend from "./pages/Lend/Lend";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/ride" element={<Ride />} />
        <Route path="/lend" element={<Lend />} />
        <Route
          path="/walk"
          element={
            <WalkRouteMap
              userLocation={{
                lat: 12.9968573,
                lng: 77.5650743,
              }}
            />
          }
        />
        <Route path="/booking-details" element={<BookingDetails />} />
      </Routes>
    </>
  );
}

export default App;
