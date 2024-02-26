import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";

const PrivateRoutes = () => {
  const cookies = Cookie.get("connect.sid");
  return cookies ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoutes;
