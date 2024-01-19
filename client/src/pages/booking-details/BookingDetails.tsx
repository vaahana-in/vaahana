import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useBikeContext } from "../../context/BikeContext";
import { Bike } from "../../constants/bike.type";
import moment from "moment";

const BookingDetails = () => {
  const handlePayClick = () => {};

  const { selectedBike, bookingHours } = useBikeContext();

  const [bikeDetails, setBikeDetails] = useState<Bike | null>(null);

  useEffect(() => {
    setBikeDetails(selectedBike);
  }, [selectedBike]);

  const parseTime = (timeString: string) => moment(timeString, "h:mm A");

  const calculateTimeDifference = () => {
    const fromTime = parseTime(bookingHours.from);
    const toTime = parseTime(bookingHours.to);

    if (fromTime.isValid() && toTime.isValid()) {
      const difference = moment.duration(toTime.diff(fromTime));
      return { hours: difference.hours(), minutes: difference.minutes() };
    } else {
      return "Invalid time format";
    }
  };
  const { hours, minutes } = calculateTimeDifference();

  return (
    bikeDetails && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "92vh",
          marginTop: "7vh",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            height: "15%",
            background: "lightblue",
            textAlign: "center",
          }}
        >
          <div>
            <div>{bikeDetails?.licensePlate}</div>
            <div>
              {bikeDetails?.brand} {bikeDetails?.model}
            </div>
          </div>
          <div>
            {bookingHours.from} to {bookingHours.to}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div>Owner Approval</div>
            <div>✅</div>
          </div>
        </div>
        <div style={{ width: "100%", height: "50%", background: "lawngreen" }}>
          <img
            style={{ width: "inherit", height: "100%" }}
            src={bikeDetails?.image}
            alt=""
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "35%",
            background: "antiquewhite",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={{ color: "red" }}>
              ₹ {(hours * 60 + minutes) * bikeDetails.pricePerMinute!}
            </h2>
            <span>
              for {hours} hours and {minutes} minutes
            </span>
          </div>

          <Button
            variant="contained"
            style={{ background: "blue", color: "white", margin: 20 }}
            onClick={handlePayClick}
          >
            Make Payment
          </Button>
        </div>
      </div>
    )
  );
};

export default BookingDetails;
