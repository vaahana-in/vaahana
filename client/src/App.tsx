
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Ride from './pages/ride/Ride';

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ride" element={<Ride />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
