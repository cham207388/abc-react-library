# React Notes

## install

```bash
npm install abc-react-library
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

  return <SignInForm
    onSubmit={handleLogin}
    onSuccess={handleSuccess}
    buttonText="Sign In" />;
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

  return (
    <>
      <SignUpForm 
        onSubmit={handleSignUp}
        redirectTo="/signin"
        buttonText="Sign Up" />
    </>
  );
};

export default SignUp;
```