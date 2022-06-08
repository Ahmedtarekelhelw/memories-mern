import {
  AppBar,
  Avatar,
  Button,
  Typography,
  Toolbar,
  IconButton,
  Stack,
} from "@mui/material";

import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import memoriesText from "../../images/memories-Text.png";
import memoriesLogo from "../../images/memories-Logo.png";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { GETSTATE, LOGOUT } from "../../redux/constants/actionTypes";
import decode from "jwt-decode";
import { Box } from "@mui/system";
const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logOut = useCallback(() => {
    dispatch({ type: LOGOUT });

    navigate("/");

    setUser(null);
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch({ type: GETSTATE });
  }, [dispatch]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, logOut, user?.token]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Toolbar sx={{ width: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Link to="/">
            <img
              src={memoriesText}
              alt="memoriesText"
              height="40"
              style={{ marginRight: "10px" }}
            />
            <img src={memoriesLogo} alt="memoriesLogo" height="35" />
          </Link>
          {user ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                style={{ backgroundColor: "#ab47bc" }}
                src={user?.result.imageUrl}
                alt={user?.result.name}
              >
                {user?.result.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6" style={{ margin: "0 15px" }}>
                {user.result.name}
              </Typography>
              <Button variant="contained" color="error" onClick={logOut}>
                Logout
              </Button>
            </Stack>
          ) : (
            <Button variant="contained" component={Link} to="/auth">
              Sign In
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
