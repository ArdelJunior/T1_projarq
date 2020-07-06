import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollTop";

import Index from "./views/Index";
import DashboardAluno from "./views/aluno/DashboardAluno";
import LoginAluno from "./views/aluno/LoginAluno";
import SignUpAluno from "./views/aluno/SignUpAluno";
import CriarTimeSugerido from "./views/aluno/CriarTimeSugerido";

import LoginAvaliador from "./views/avaliador/LoginAvaliador";
// import SignupAvaliador from "./views/avaliador/SignupAvaliador";

import GerenciarAlunos from "./views/administrador/GerenciarAlunos";
import GerenciarTimes from "./views/administrador/GerenciarTimes";
import AddTime from "./views/administrador/AddTime";
import EditTime from "./views/administrador/EditTime";
import GerenciarAvaliacoes from "./views/administrador/GerenciarAvaliacoes";

import Avaliacoes from "./views/avaliador/Avaliacoes";

import Page404 from "./views/common/Page404";
import DashboardAdministrador from "./views/administrador/DashboardAdministrador";
import LoginAdministrador from "./views/administrador/LoginAdministrador";
import Logout from "./views/common/Logout";
import authParams from "./services/AuthParams";
import GerenciarAvaliadores from "./views/administrador/GerenciarAvaliadores";

const ProtectedRoute = ({component: Component, authRole, ...rest}) => {
  return (
    <Route {...rest} render={(props) => {
      const params = authParams();
      if(params && Object.keys(params).length > 0 && (!authRole || params.role === authRole)) {
        return <Component {...props} />;
      }
      return <Redirect to="/" />;
    }} />
  )
}

export default (props) => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Index} />

        <Route path="/aluno/login" component={LoginAluno} />
        <Route path="/aluno/signup" component={SignUpAluno} />
        <ProtectedRoute path="/aluno/criar-time-sugerido" authRole="aluno" component={CriarTimeSugerido} />
        <ProtectedRoute path="/aluno" authRole="aluno" component={DashboardAluno} />

        <Route path="/avaliador/login" component={LoginAvaliador} />
        {/* <Route path="/avaliador/signup" component={SignupAvaliador} /> */}
        <ProtectedRoute path="/avaliador" authRole="avaliador" component={Avaliacoes} />

        <ProtectedRoute path="/administrador/alunos" authRole="administrador" component={GerenciarAlunos} />
        <ProtectedRoute path="/administrador/times/add" authRole="administrador" component={AddTime} />
        <ProtectedRoute path="/administrador/times/edit/:id" authRole="administrador" component={EditTime} />
        <ProtectedRoute path="/administrador/times" authRole="administrador" component={GerenciarTimes} />
        <ProtectedRoute path="/administrador/avaliacoes" authRole="administrador" component={GerenciarAvaliacoes} />
        <ProtectedRoute path="/administrador/avaliadores" authRole="administrador" component={GerenciarAvaliadores} />
        <Route path="/administrador/login" component={LoginAdministrador} />
        <ProtectedRoute path="/administrador" authRole="administrador" component={DashboardAdministrador} />

        <ProtectedRoute path="/logout" component={Logout} />

        <Route path="*" component={Page404} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);
