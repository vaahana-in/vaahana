import { useEffect, useState } from "react";
import { useBikeContext } from "../context/BikeContext";
import { Bike } from "../constants/bike.type";

const SelectedBikeInfo = () => {
  const { selectedBike } = useBikeContext();

  const [bikeDetails, setBikeDetails] = useState<Bike | null>(null);

  useEffect(() => {
    setBikeDetails(selectedBike);
  }, [selectedBike]);

  return (
    bikeDetails && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: 20,
          padding: 20,
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, padding: 0, fontWeight: "bold" }}>
          {bikeDetails?.licensePlate}
        </p>
        <p style={{ margin: 0, padding: 0 }}>
          {bikeDetails.brand?.toUpperCase()}
        </p>
        <p style={{ margin: 0, padding: 0 }}>
          {bikeDetails?.model?.toUpperCase()}
        </p>
      </div>
    )
  );
};

export default SelectedBikeInfo;
