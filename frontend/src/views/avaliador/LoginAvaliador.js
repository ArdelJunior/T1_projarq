import React, { Component } from "react";

import Login from "../../components/screens/Login";
import { loginAvaliador } from "../../utils/api";
import axios from "axios";

class LoginAvaliador extends Component {
  handleSubmit = (data) => {
    axios.post(loginAvaliador, data)
      .then((data) => {
        this.props.history.push("/avaliador")
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  render() {
    return <Login loginRole="avaliador" onSubmit={this.handleSubmit} signup />;
  }
}

export default LoginAvaliador;
