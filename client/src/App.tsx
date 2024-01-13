import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Ride from "./pages/ride/Ride";
import WalkRouteMap from "./components/WalkRouteMap";
import BookingDetails from "./pages/booking-details/BookingDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ride" element={<Ride />} />
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
