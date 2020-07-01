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
import DashboardAvaliador from "./views/avaliador/DashboardAvaliador";
import GerenciarAlunos from "./views/avaliador/GerenciarAlunos";
import GerenciarTimes from "./views/avaliador/GerenciarTimes";
import AddTime from "./views/avaliador/AddTime";
import EditTime from "./views/avaliador/EditTime";

import Avaliacoes from "./views/avaliador/Avaliacoes";

import Page404 from "./views/common/Page404";



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
        <Route path="/avaliador/alunos" component={GerenciarAlunos} />
        <Route path="/avaliador/times/add" component={AddTime} />
        <Route path="/avaliador/times/edit/:id" component={EditTime} />
        <Route path="/avaliador/times" component={GerenciarTimes} />
        <Route path="/avaliador/avaliacoes" component={Avaliacoes} />
        <Route path="/avaliador" component={DashboardAvaliador} />

        <Route path="/logout">
          <Redirect to="/" />
        </Route>

        <Route path="*" component={Page404} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);
