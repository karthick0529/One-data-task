import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Main.css";
const Main = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <AppBar position="fixed" className="AppBar">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, width: "50%" }}>
            OneData Assessment
          </Typography>

          <Button
            color="inherit"
            className="signin-button"
            component={Link}
            to="/signin"
          >
            Sign In
          </Button>
          <Button
            color="inherit"
            className="signup-button"
            component={Link}
            to="/signup"
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <div className="container">
        <Typography variant="h4" gutterBottom className="welcome-title">
          Welcome to My App!
        </Typography>
        <Typography variant="body1" paragraph>
          First, click on the <strong>Sign Up</strong> button to create an
          account. Then, use the <strong>Sign In</strong> button to log into
          your account.
        </Typography>
        <Typography variant="body1" paragraph>
          Once you're on the Home Page, you can like pictures, follow users, and
          add tags to pictures you enjoy. Finally, you can log out to secure
          your account.
        </Typography>
      </div>
      <footer className="footer">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

export default Main;
