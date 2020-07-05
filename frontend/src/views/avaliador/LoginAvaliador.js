import React, { Component } from "react";

import Login from "../../components/screens/Login";
import { login } from "../../utils/api";
import ApiReq from "../../components/common/ApiReq";

class LoginAvaliador extends Component {
  api = ApiReq.getInstance();
  
  handleSubmit = (data) => {
    this.api.post(login, data)
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
