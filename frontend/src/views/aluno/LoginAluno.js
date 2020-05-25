import React, { Component } from "react";

import Login from "../common/Login";
import { loginAluno } from "../../utils/api";
import Axios from "axios";

class LoginAluno extends Component {
  handleSubmit = (data) => {
    console.log(data);
    Axios.post(loginAluno, data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  render() {
    return <Login loginRole="aluno" onSubmit={this.handleSubmit} />;
  }
}

export default LoginAluno;
