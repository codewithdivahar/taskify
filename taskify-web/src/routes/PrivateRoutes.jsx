import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isLoggedIn = localStorage.getItem("@IS_LOGGED_IN");
  return isLoggedIn === "true" ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoutes;
