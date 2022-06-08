import React, { useState } from "react";
import { Avatar, Button, Container, Grid, Typography } from "@mui/material";
import Input from "../components/Input";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { AUTH } from "../redux/constants/actionTypes";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../redux/actions/auth";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //toggle show password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //change on input of form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //auth form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
    console.log(formData);
  };

  const handleSign = () => {
    setSignUp(!signUp);
  };

  //google auth
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("Google Sign In Was UnSuccessful Try Again later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <div
        className="head"
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        <Avatar style={{ margin: "5px auto" }}></Avatar>
        <Typography variant="h5">{signUp ? "SignUp" : "SignIn"}</Typography>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {signUp && (
            <>
              <Input
                name="firstName"
                label="First Name"
                half
                handleChange={handleChange}
              />
              <Input
                name="lastName"
                label="Last Name"
                half
                handleChange={handleChange}
              />
            </>
          )}
          <Input name="email" label="Email" handleChange={handleChange} />
          <Input
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
            handleChange={handleChange}
          />
          {signUp && (
            <Input
              name="confirmPassword"
              label="Repeat Password"
              type="password"
              handleChange={handleChange}
            />
          )}
        </Grid>
        <Button
          variant="contained"
          fullWidth
          style={{ margin: "10px 0" }}
          type="submit"
        >
          {signUp ? "SignUp" : "SignIn"}
        </Button>
        <GoogleLogin
          clientId="15427888673-01n751o13efbg3bmt9g5er3dd3i8vtrm.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              variant="contained"
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<GoogleIcon />}
            >
              Google Sign In
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
        <Grid>
          <Button onClick={handleSign}>{signUp ? "SignIn" : "SignUp"}</Button>
        </Grid>
      </form>
    </Container>
  );
};

export default Auth;
