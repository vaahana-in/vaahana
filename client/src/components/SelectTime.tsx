import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { useBikeContext } from "../context/BikeContext";
import { useEffect, useState } from "react";

const SelectTime = () => {
  const { bookingHours, setBookingHours } = useBikeContext();

  const [timeRange, setTimeRange] = useState<{
    from: string | null;
    to: string | null;
  }>({
    from: null,
    to: null,
  });

  const fromHandler = (time) => {
    const formattedTime = moment(time._d).format("h:mm A");
    setTimeRange((prevTimeRange) => ({
      ...prevTimeRange,
      from: formattedTime,
    }));
  };

  const toHandler = (time) => {
    const formattedTime = moment(time._d).format("h:mm A");
    setTimeRange((prevTimeRange) => ({
      ...prevTimeRange,
      to: formattedTime,
    }));
  };

  useEffect(() => {
    setBookingHours(timeRange);
  }, [timeRange, setBookingHours]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker onAccept={(value) => fromHandler(value)} label="From" />
        </DemoContainer>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker onAccept={(value) => toHandler(value)} label="To" />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default SelectTime;
