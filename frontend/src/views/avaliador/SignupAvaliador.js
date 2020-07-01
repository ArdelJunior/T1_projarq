import React from "react";
import { withRouter, Redirect } from "react-router-dom";

class SignupAvaliador extends React.Component {
  render() {
    return <Redirect to="/avaliador" />;
  }
}

export default withRouter(SignupAvaliador);
