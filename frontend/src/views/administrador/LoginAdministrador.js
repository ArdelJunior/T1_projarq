import React, { Component } from "react";

import Login from "../../components/screens/Login";
import { loginAdministrador } from "../../utils/api";
import axios from "axios";

class LoginAdministrador extends Component {
  handleSubmit = (data) => {
    axios.post(loginAdministrador, data)
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
