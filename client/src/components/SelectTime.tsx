import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const SelectTime = () => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker label="From" />
        </DemoContainer>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker label="To" />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default SelectTime;
