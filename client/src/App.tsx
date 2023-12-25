import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Ride from "./pages/ride/Ride";
import WalkRouteMap from "./components/WalkRouteMap";

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
      </Routes>
    </>
  );
}

export default App;
