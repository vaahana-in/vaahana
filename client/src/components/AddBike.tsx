import { useEffect, useState } from "react";
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
    brand: "",
    model: "",
    makeYear: "",
    licensePlate: "",
    location: { latitude: "", longitude: "" },
    availability: true,
    pricePerMinute: 0,
    image: "",
  });

  const { authToken } = useAuthContext();

  const handleChange = (e: { target: { name: string; value: unknown } }) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevFormData: any) => ({
          ...prevFormData,
          location: { latitude, longitude },
        }));
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  // const handleFileChange = (field: string) => (event) => {
  //   const file = event.target.files[0];

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [field]: file,
  //   }));
  // };

  const handleLocationChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: {
        ...prevFormData.location,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    await axios.post(`http://localhost:3000/bike`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Bike</DialogTitle>
      <DialogContent>
        <TextField
          label="Brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Make Year"
          name="makeYear"
          value={formData.makeYear}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="License Plate"
          name="licensePlate"
          value={formData.licensePlate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Latitude"
          name="latitude"
          value={formData.location.latitude}
          onChange={handleLocationChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Longitude"
          name="longitude"
          value={formData.location.longitude}
          onChange={handleLocationChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price Per Minute"
          name="pricePerMinute"
          type="number"
          value={formData.pricePerMinute}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image"
          name="image"
          type="string"
          value={formData.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
