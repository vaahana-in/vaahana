import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#2196F3",
  },
  grow: {
    flexGrow: 1,
  },
  userNameButton: {
    textTransform: "none", // Prevents the uppercase transformation
    marginRight: 2,
  },
}));

const AppHeader = () => {
  const [username, setUsername] = useState();
  const { authToken, setToken } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setUsername(res.data[0].name);
      });
  }, [authToken, username]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear user authentication token, redirect, etc.
    setToken(null);
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" onClick={() => navigate("/home")}>
          Vaahana
        </Typography>
        <div className={classes.grow} />
        {authToken && (
          <Button
            className={classes.userNameButton}
            color="inherit"
            startIcon={<AccountCircle />}
            onClick={handleMenuOpen}
          >
            {username}
          </Button>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
