import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Box, Typography, Alert, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const SignInForm = ({
  fields,
  onSubmit,
  onSuccess,
  errorMessage,
  buttonText = "Login",
  sx = {}
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit(formData);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError(errorMessage || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, ...sx }}>
      <Typography variant="h4" gutterBottom>Sign In</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            fullWidth
            margin="normal"
            required
            value={formData[field.name]}
            onChange={handleChange}
            autoComplete={field.autoComplete}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : buttonText}
        </Button>
      </form>

      <Typography sx={{ mt: 2 }}>
        Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </Box>
  );
};

SignInForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      autoComplete: PropTypes.string
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  errorMessage: PropTypes.string,
  buttonText: PropTypes.string,
  sx: PropTypes.object
};

export default SignInForm;