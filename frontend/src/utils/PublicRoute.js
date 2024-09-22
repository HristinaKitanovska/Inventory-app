import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const PublicRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);

  // If the user is logged in, redirect to the dashboard
  if (authToken) {
    return <Navigate to="/dashboard" />;
  }

  // If not logged in, render the public route content
  return children;
};

export default PublicRoute;
