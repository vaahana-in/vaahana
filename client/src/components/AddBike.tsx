import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const AddBike = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    ownerName: "",
    regNumber: "",
    bikeName: "",
    bikeModel: "",
    ownershipDocument: "",
    ownerIdPhoto: "",
    ownerMobile: "",
    chargesPerMin: "",
    bikePhoto1: "",
  });

  const { authToken } = useAuthContext();

  const handleChange = (field: string) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  // const handleFileChange = (field: string) => (event) => {
  //   const file = event.target.files[0];

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [field]: file,
  //   }));
  // };

  const handleSave = async () => {
    const addBikeRes = await axios.post(
      `http://localhost:3000/bike`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Bike</DialogTitle>
      <DialogContent>
        <TextField
          label="Bike Owner Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.ownerName}
          onChange={handleChange("ownerName")}
        />
        <TextField
          label="Bike Registration Number"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.regNumber}
          onChange={handleChange("regNumber")}
        />
        <TextField
          label="Bike Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.bikeName}
          onChange={handleChange("bikeName")}
        />
        <TextField
          label="Bike Model"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.bikeModel}
          onChange={handleChange("bikeModel")}
        />
        <TextField
          label="Charges per minute"
          fullWidth
          margin="normal"
          type="number"
          variant="outlined"
          value={formData.chargesPerMin}
          onChange={handleChange("chargesPerMin")}
        />
        <TextField
          label="Ownership Document"
          fullWidth
          margin="normal"
          variant="outlined"
          type="string"
          onChange={handleChange("ownershipDocument")}
        />
        <TextField
          label="Owner ID Photo"
          fullWidth
          margin="normal"
          variant="outlined"
          type="string"
          onChange={handleChange("ownerIdPhoto")}
        />
        <TextField
          label="Bike Photo 1"
          fullWidth
          margin="normal"
          variant="outlined"
          type="text"
          onChange={handleChange("bikePhoto1")}
        />
        {/* <TextField
          label="Bike Photo 2"
          fullWidth
          margin="normal"
          variant="outlined"
          type="file"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleFileChange("bikePhoto2")}
        /> */}
        <TextField
          label="Owner Mobile Number"
          fullWidth
          margin="normal"
          variant="outlined"
          type="number"
          value={formData.ownerMobile}
          onChange={handleChange("ownerMobile")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBike;
