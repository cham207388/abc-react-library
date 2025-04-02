import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SignUpForm = ({
  fields,
  onSubmit,
  redirectTo = "/signin",
  buttonText = "Register",
  sx = {}
}) => {
  // Initialize form state based on fields
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, ...sx }}>
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            fullWidth
            margin="normal"
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}
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

SignUpForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  buttonText: PropTypes.string,
  sx: PropTypes.object,
};

export default SignUpForm;