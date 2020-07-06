import React from "react";
const { default: AuthService } = require("../../services/AuthService");
const { Redirect } = require("react-router-dom");

function Logout() {
  AuthService.logout();
  return <Redirect to="/" />;
}

export default Logout;
