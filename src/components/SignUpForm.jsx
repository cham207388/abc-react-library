import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SignUpForm = ({ onSubmit, redirectTo = "/signin", buttonText = "Register", sx = {} }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, ...sx }}>
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="First Name" name="first_name" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Last Name" name="last_name" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {buttonText}
        </Button>
      </form>
      <Typography sx={{ mt: 2, textAlign: "center" }}>
        Already have an account? <Link to={redirectTo}>Sign In</Link>
      </Typography>
    </Box>
  );
};

// Define PropTypes for flexibility
SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Function to handle signup
  redirectTo: PropTypes.string,        // Customizable redirect link
  buttonText: PropTypes.string,        // Custom button text
  sx: PropTypes.object,                // Custom styling
};

export default SignUpForm;