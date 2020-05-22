const express = require('express');
 
const AlunoController = require('./controllers/AlunoController');
const ProfessorController = require('./controllers/ProfessorController');
const GrupoProvisorioController = require('./controllers/GrupoProvisorioController');
const SessionController = require('./controllers/SessionController');
const GrupoFinalController = require('./controllers/GrupoFinalController');
 
const routes = express.Router();
 
routes.post('/sessions', SessionController.login);

routes.get('/alunos', AlunoController.index);
routes.post('/alunos', AlunoController.create);

routes.get('/professores', ProfessorController.index);
routes.post('/professores', ProfessorController.create);

routes.get('/gruposProvisorios', GrupoProvisorioController.index);
routes.post('/gruposProvisorios', GrupoProvisorioController.create);
routes.delete('/gruposProvisorios/:id', GrupoProvisorioController.delete);
routes.put('/gruposProvisorios/:id', GrupoProvisorioController.alterar);

routes.get('/gruposFinais', GrupoFinalController.index);
routes.post('/gruposFinais', GrupoFinalController.create);
 
module.exports = routes; 