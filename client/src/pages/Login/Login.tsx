import { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import axios from "axios";

import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Snackbar, SnackbarOrigin } from "@material-ui/core";

interface State extends SnackbarOrigin {
  open: boolean;
}

const Login = () => {
  const navigate = useNavigate();

  const { setToken } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [snackbarState, snackbarSetState] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { vertical, horizontal, open } = snackbarState;

  const handleClose = () => {
    snackbarSetState({ ...snackbarState, open: false });
  };

  const handleChange = (field) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_PUBLIC_SERVER_URL}/login`,
        formData
      );
      if (response.data) {
        const token = response.data.token;
        setToken(token);
        navigate("/");
      }
    } catch (err) {
      snackbarSetState({ ...snackbarState, open: true });
      setSnackbarMessage("Login failed, " + err.response.data.error);
      setTimeout(() => {
        snackbarSetState({ ...snackbarState, open: false });
      }, 2000);
    }
  };

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
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange("password")}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "1vh" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
