# React Notes

## install

```bash
npm install abc-react-library
```

or a particular version, say version 1.0.0

```bash
npm install abc-react-library@1.0.0
```

## use SignInForm

```jsx
import { SignInForm } from "abc-react-library";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    await login(email, password, navigate); // Call your existing login function
  };

  const handleSuccess = () => {
    navigate("/")
  }

  const signInFields = [
    { name: "email", label: "Email", type: "email", autoComplete: "email" },
    { name: "password", label: "Password", type: "password", autoComplete: "current-password" }
  ]

  return <SignInForm
    fields={signInFields}
    onSubmit={handleLogin}

    onSuccess={handleSuccess}
    errorMessage="Error login in"
    buttonText="Log In"
  />
};

export default SignIn;
```

## use SignUpForm

```jsx
import { SignUpForm } from "abc-react-library"; // Replace with your actual library name
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (user) => {
    try {
      await api.post("/users", user);
      navigate("/signin");
    } catch (error) {
      console.error("Registration Failed", error);
    }
  };

  // Define the fields for this specific form
  const signUpFields = [
    { name: "first_name", label: "First Name" },
    { name: "last_name", label: "Last Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" }
  ];

  return (
    <SignUpForm
      fields={signUpFields}
      onSubmit={handleSignUp}
      redirectTo="/signin"
      buttonText="Sign Up"
    />
  );
};

export default SignUp;
```