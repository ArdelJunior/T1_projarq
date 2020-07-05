import React, { Component } from "react";

import Login from "../../components/screens/Login";
import { login } from "../../utils/api";
import ApiReq from "../../components/common/ApiReq";

class LoginAdministrador extends Component {
  api = ApiReq.getInstance();
  
  handleSubmit = (data) => {
    this.api.post(login, data)
      .then((data) => {
        this.props.history.push("/administrador")
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  render() {
    return <Login loginRole="administrador" onSubmit={this.handleSubmit} />;
  }
}

export default LoginAdministrador;
