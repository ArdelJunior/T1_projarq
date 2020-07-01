import React, { Component } from "react";

import Login from "../../components/screens/Login";
import { loginAluno } from "../../utils/api";
import axios from "axios";

class LoginAluno extends Component {
  handleSubmit = (data) => {
    axios.post(loginAluno, data)
      .then((data) => {
        this.props.history.push("/aluno")
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
