import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Bike } from "../constants/bike.type";
import axios from "axios";

type BikeProviderComponentProps = {
  children: ReactNode;
};

export type BookingHours = {
  from: string;
  to: string;
};

export type BikeContextType = {
  bikeData: Bike[] | null;
  updateBikeData: (newBikeData: Bike[]) => void;
  selectedBike: Bike | null;
  selectBike: (bike: Bike) => void;
  bookingHours: BookingHours | null;
  setBookingHours: (bookingHours: BookingHours) => void;
};

const BikeContext = createContext<BikeContextType | null>(null);

const BikeProvider: React.FC<BikeProviderComponentProps> = ({ children }) => {
  const [bikeData, setBikeData] = useState<Bike[] | null>(null);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  const [bookingHours, setBookingHours] = useState<BookingHours | null>(null);

  useEffect(() => {
    axios.get("http://localhost:3000/bike").then((bikesRes) => {
      setBikeData(bikesRes.data);
    });
  }, [bikeData, selectedBike]);

  const updateBikeData = (newBikeData: Bike[]) => {
    setBikeData(newBikeData);
  };

  const selectBike = (bike: Bike) => {
    setSelectedBike(bike);
  };

  return (
    <BikeContext.Provider
      value={{
        bikeData,
        updateBikeData,
        selectedBike,
        selectBike,
        bookingHours,
        setBookingHours,
      }}
    >
      {children}
    </BikeContext.Provider>
  );
};

export const useBikeContext = (): BikeContextType | null => {
  return useContext(BikeContext);
};

export default BikeProvider;
