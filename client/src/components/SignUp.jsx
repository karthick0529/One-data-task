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
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/users/signup`, {
        username,
        email,
        password,
      });
      setSnackbarMessage("User sign up successful!");
      setOpenSnackbar(true); // Show success message
      setTimeout(() => {
        navigate("/signin"); // Redirect to sign in after 2 seconds
      }, 2000);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Sign up failed! Please try again.");
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
            Create Account
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
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} className="sign-up-paper">
            <Typography variant="h5" align="center" gutterBottom>
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSignUp}>
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                required
                aria-label="Username"
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
                aria-label="Email"
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
              >
                Sign Up
              </Button>
            </Box>
          </Paper>
        </Grid>
        {/* Snackbar for success/error message */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Grid>
    </>
  );
};

export default SignUp;
