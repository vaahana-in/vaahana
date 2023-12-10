import { Button, Typography } from '@material-ui/core';
import MobileCarousel from './components/Carousal';
import Map from './components/Map';
import { useState } from 'react';



function App() {

  const [bike, setBike] = useState(null)

  const handleBikeClick = (bike) => {
    setBike(bike)
  }

  return <>
    <Typography variant="h4" align='center'>Bike Rental</Typography>
    <div style={{ height: "40vh" }}>
      <Map onBikeClick={handleBikeClick} />
    </div>
    <MobileCarousel bike={bike} />
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: "space-around" }}>
      <Button>Profile</Button>
      <Button>Ride</Button>
      <Button>Rent</Button>
      <Button>History</Button>
    </div>
  </>

}

export default App
