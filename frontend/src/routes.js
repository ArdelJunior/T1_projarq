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

export default (props) => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Index} />

        <Route path="/aluno/login" component={LoginAluno} />
        <Route path="/aluno/signup" component={SignUpAluno} />
        <Route path="/aluno/criar-time-sugerido" component={CriarTimeSugerido} />
        <Route path="/aluno" component={DashboardAluno} />

        <Route path="/avaliador/login" component={LoginAvaliador} />
        <Route path="/avaliador/signup" component={SignupAvaliador} />
        <Route path="/avaliador" component={Avaliacoes} />

        <Route path="/administrador/alunos" component={GerenciarAlunos} />
        <Route path="/administrador/times/add" component={AddTime} />
        <Route path="/administrador/times/edit/:id" component={EditTime} />
        <Route path="/administrador/times" component={GerenciarTimes} />
        <Route path="/administrador/avaliacoes" component={GerenciarAvaliacoes} />
        <Route path="/administrador" component={DashboardAdministrador} />

        <Route path="/logout">
          <Redirect to="/" />
        </Route>

        <Route path="*" component={Page404} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);
