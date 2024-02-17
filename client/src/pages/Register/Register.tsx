import { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Snackbar, SnackbarOrigin } from "@material-ui/core";

interface State extends SnackbarOrigin {
  open: boolean;
}

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [snackbarState, snackbarSetState] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { vertical, horizontal, open } = snackbarState;

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }
  };

  const handleChange =
    (field: string) => (event: { target: { value: unknown } }) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: event.target.value,
      }));

      setErrors({ ...errors, [field]: "" });
    };

  const handleClose = () => {
    snackbarSetState({ ...snackbarState, open: false });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    validatePasswords();

    try {
      const registrationRes = await axios.post(
        `${import.meta.env.VITE_APP_PUBLIC_SERVER_URL}/register`,
        formData
      );
      if (registrationRes.data.success) {
        navigate("/login");
      }
    } catch (err) {
      snackbarSetState({ ...snackbarState, open: true });
      setSnackbarMessage("Registration failed, " + err.response.data.message);
      setTimeout(() => {
        snackbarSetState({ ...snackbarState, open: false });
      }, 2000);
    }
  };

  const navigate = useNavigate();

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "98vh",
      }}
    >
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={snackbarMessage}
          key={vertical + horizontal}
        />
      </Box>
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange("name")}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={formData.phoneNumber}
              onChange={handleChange("phoneNumber")}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              value={formData.address}
              onChange={handleChange("address")}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange("password")}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              required
            />
          </Grid>
          <Grid style={{ justifyContent: "center" }}>
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
            <Button
              onClick={() => navigate("/login")}
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "1vh" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Register;
