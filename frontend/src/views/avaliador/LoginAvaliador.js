import React, { Component } from "react";

import Login from "../common/Login";
import { loginAvaliador } from "../../utils/api";
import Axios from "axios";

class LoginAvaliador extends Component {
  
  handleSubmit = (data) => {
    console.log(data);
    Axios.post(loginAvaliador, data).then((data) => {
      console.log(data);
    }).catch(error => {
      console.error(error.response.data);
    })
  }

  render() {
    return (
      <Login loginRole="avaliador" onSubmit={this.handleSubmit} />
    );
  }
}

export default LoginAvaliador;
