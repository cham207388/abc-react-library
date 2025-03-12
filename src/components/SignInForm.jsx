import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Box, Typography, Alert, CircularProgress } from "@mui/material";

const SignInForm = ({ onSubmit, onSuccess, errorMessage, buttonText = "Login", sx = {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.log(err)
      setError(errorMessage || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, ...sx }}>
      <Typography variant="h4" gutterBottom>Sign In</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

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

// Define PropTypes for better usability
SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,  // Function to handle login
  onSuccess: PropTypes.func,            // Optional callback on success
  errorMessage: PropTypes.string,       // Custom error message
  buttonText: PropTypes.string,         // Custom button text
  sx: PropTypes.object,                  // Custom styling
};

export default SignInForm;