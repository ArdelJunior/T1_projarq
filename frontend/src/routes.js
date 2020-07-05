import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollTop";

import Index from "./views/Index";
import DashboardAluno from "./views/aluno/DashboardAluno";
import LoginAluno from "./views/aluno/LoginAluno";
import SignUpAluno from "./views/aluno/SignUpAluno";
import CriarTimeSugerido from "./views/aluno/CriarTimeSugerido";

import LoginAvaliador from "./views/avaliador/LoginAvaliador";
import SignupAvaliador from "./views/avaliador/SignupAvaliador";

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
import authHeader from "./services/AuthHeader";

const ProtectedRoute = ({component: Component, auth, ...rest}) => {
  return (
    <Route {...rest} render={(props) => {
      const header = authHeader();
      if(header) {
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
        <ProtectedRoute path="/aluno/criar-time-sugerido" component={CriarTimeSugerido} />
        <ProtectedRoute path="/aluno" component={DashboardAluno} />

        <Route path="/avaliador/login" component={LoginAvaliador} />
        <Route path="/avaliador/signup" component={SignupAvaliador} />
        <ProtectedRoute path="/avaliador" component={Avaliacoes} />

        <ProtectedRoute path="/administrador/alunos" component={GerenciarAlunos} />
        <ProtectedRoute path="/administrador/times/add" component={AddTime} />
        <ProtectedRoute path="/administrador/times/edit/:id" component={EditTime} />
        <ProtectedRoute path="/administrador/times" component={GerenciarTimes} />
        <ProtectedRoute path="/administrador/avaliacoes" component={GerenciarAvaliacoes} />
        <Route path="/administrador/login" component={LoginAdministrador} />
        <ProtectedRoute path="/administrador" component={DashboardAdministrador} />

        <ProtectedRoute path="/logout" component={Logout} />

        <Route path="*" component={Page404} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);
