// SignIn.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  Snackbar,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signin",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      setOpenSnackbar(true); // Show success message
      setTimeout(() => {
        navigate("/home"); // Redirect to homepage after 2 seconds
      }, 2000);
    } catch (error) {
      console.error(error);
      setOpenSnackbar(true); // Show error message
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, width: "50%" }}>
            Login
          </Typography>
          <Button color="inherit" onClick={() => navigate("/signin")}>
            Sign In
          </Button>
          <Button color="inherit" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh", marginTop: "64px" }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper
            elevation={3}
            style={{ padding: "30px", borderRadius: "12px" }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSignIn}>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
                aria-label="Email"
                className="textField"
                style={{ fontSize: "1.1rem" }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
                aria-label="Password"
                className="textField"
                style={{ fontSize: "1.1rem" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ padding: "12px", fontSize: "1.1rem" }}
              >
                {" "}
                {/* Larger button */}
                Sign In
              </Button>
            </Box>
          </Paper>
        </Grid>
        {/* Snackbar for success/error message */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message="Sign in successful! Redirecting..."
        />
      </Grid>
    </>
  );
};

export default SignIn;
