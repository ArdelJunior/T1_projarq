import React, { Component } from "react";

import Login from "../../components/screens/Login";
import AuthService from "../../services/AuthService";
import Toastr from "../../components/common/Toastr";

class LoginAluno extends Component {
  state = {
    toastOpen: false,
    toastSeverity: "info",
    toastMessage: "",
  }

  handleSubmit = (data) => {
    AuthService.login(data)
      .then((data) => {
        this.props.history.push("/aluno");
      })
      .catch((err) => {
        console.error(err.response.data);
        this.showToast("error", err.response ? err.response.data.error : "Erro de conexão");
      });
  };

  showToast = (severity, message) => {
    this.setState({
      toastOpen: true,
      toastSeverity: severity,
      toastMessage: message,
    });
  };

  handleToastClose = () => {
    this.setState({
      toastOpen: false,
      toastSeverity: "info",
      toastMessage: "",
    });
  };

  render() {
    return (
      <React.Fragment>
        <Toastr
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          timeout={6000}
          severity={this.state.toastSeverity}
          message={this.state.toastMessage}
          open={this.state.toastOpen}
          onClose={this.handleToastClose}
        />
        <Login loginRole="aluno" onSubmit={this.handleSubmit} signup />
      </React.Fragment>
    );
  }
}

export default LoginAluno;
