import { Button, Typography } from '@material-ui/core';
import MobileCarousel from './components/Carousal';
import Map from './components/Map';



function App() {
  return <>
    <Typography variant="h4" align='center'>Bike Rental</Typography>
    <div style={{ height: "40vh" }}>
      <Map />
    </div>
    <MobileCarousel />
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: "space-around" }}>
      <Button>Tab1</Button>
      <Button>Tab2</Button>
      <Button>Tab3</Button>
      <Button>Tab4</Button>
    </div>
  </>

}

export default App
