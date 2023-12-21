import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Bike } from "../constants/bike.type";
import bikesData from "../constants/bikes.data";

type BikeProviderComponentProps = {
  children: ReactNode;
};

export type BikeContextType = {
  bikeData: Bike[] | null;
  updateBikeData: (newBikeData: Bike[]) => void;
  selectedBike: Bike | null;
  selectBike: (bike: Bike) => void;
};

const BikeContext = createContext<BikeContextType | null>(null);

const BikeProvider: React.FC<BikeProviderComponentProps> = ({ children }) => {
  const [bikeData, setBikeData] = useState<Bike[] | null>(null);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  useEffect(() => {
    setBikeData(bikesData);
  }, [bikeData, selectedBike]);

  const updateBikeData = (newBikeData: Bike[]) => {
    setBikeData(newBikeData);
  };

  const selectBike = (bike: Bike) => {
    setSelectedBike(bike);
  };

  return (
    <BikeContext.Provider
      value={{ bikeData, updateBikeData, selectedBike, selectBike }}
    >
      {children}
    </BikeContext.Provider>
  );
};

export const useBikeContext = (): BikeContextType | null => {
  return useContext(BikeContext);
};

export default BikeProvider;
