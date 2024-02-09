import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { BikeResponse } from "../../src/constants/bike.type";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

type BikeProviderComponentProps = {
  children: ReactNode;
};

export type BookingHours = {
  from: string;
  to: string;
};

export type BikeContextType = {
  bikeData: BikeResponse[] | null;
  updateBikeData: (newBikeData: BikeResponse[]) => void;
  selectedBike: BikeResponse | null;
  selectBike: (bike: BikeResponse) => void;
  bookingHours: BookingHours | null;
  setBookingHours: (bookingHours: BookingHours) => void;
};

const BikeContext = createContext<BikeContextType | null>(null);

const BikeProvider: React.FC<BikeProviderComponentProps> = ({ children }) => {
  const [bikeData, setBikeData] = useState<BikeResponse[] | null>(null);
  const [selectedBike, setSelectedBike] = useState<BikeResponse | null>(null);

  const [bookingHours, setBookingHours] = useState<BookingHours | null>(null);
  const { authToken } = useAuthContext();

  useEffect(() => {
    axios
      .get("http://localhost:3000/bike", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((bikesRes) => {
        setBikeData(bikesRes.data);
      });
  }, []);

  const updateBikeData = (newBikeData: BikeResponse[]) => {
    setBikeData(newBikeData);
  };

  const selectBike = (bike: BikeResponse) => {
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
