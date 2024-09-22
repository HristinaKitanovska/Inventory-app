import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);

  // If the user is not logged in, redirect to the login page
  if (!authToken) {
    return <Navigate to="/" />;
  }

  // If logged in, render the children components (protected route content)
  return children;
};

export default ProtectedRoute;
