import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Wizard from "./components/Wizard";
import Cards from "./components/Cards";
import Main from "./components/Main";
import ScrollToTop from "./components/ScrollTop";

import Index from "./views/Index";
import DashboardAluno from "./views/aluno/DashboardAluno";
import LoginAluno from "./views/aluno/LoginAluno";
import SignUpAluno from "./views/aluno/SignUpAluno";
import CreateTimeSugerido from "./views/aluno/CreateTimeSugerido";

import DashboardAvaliador from "./views/avaliador/DashboardAvaliador";
import GerenciarAlunos from "./views/avaliador/GerenciarAlunos";
import GerenciarTimes from "./views/avaliador/GerenciarTimes";


export default (props) => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <Route path="/aluno/login" component={LoginAluno} />
        <Route path="/aluno/signup" component={SignUpAluno} />
        <Route path="/aluno/criar-time-sugerido" component={CreateTimeSugerido} />
        <Route path="/aluno" component={DashboardAluno} />

        <Route path="/avaliador/alunos" component={GerenciarAlunos} />
        <Route path="/avaliador/times" component={GerenciarTimes} />
        <Route path="/avaliador" component={DashboardAvaliador} />

        <Route path="/logout">
          <Redirect to="/" />
        </Route>

        <Route path="/dashboard" component={Dashboard} />
        <Route path="/wizard" component={Wizard} />
        <Route path="/cards" component={Cards} />

        <Route exact path="/" component={Index} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);
