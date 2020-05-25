const express = require('express');
 
const AlunoController = require('./controllers/AlunoController');
const ProfessorController = require('./controllers/ProfessorController');
const GrupoProvisorioController = require('./controllers/GrupoProvisorioController');
const AlunoSessionController = require('./controllers/AlunoSessionController');
const GrupoFinalController = require('./controllers/GrupoFinalController');
const AvaliacaoController = require('./controllers/AvaliacaoController');
const ProfessorSessionController = require('./controllers/ProfessorSessionController');
 
const routes = express.Router();
 
routes.post('/alunoSession', AlunoSessionController.login);

routes.post('/professorSession', ProfessorSessionController.login);

routes.get('/alunos', AlunoController.index);
routes.get('/alunos/:id', AlunoController.get);
routes.post('/alunos', AlunoController.create);

routes.get('/professores', ProfessorController.index);
routes.post('/professores', ProfessorController.create);

routes.get('/gruposProvisorios', GrupoProvisorioController.index);
routes.post('/gruposProvisorios', GrupoProvisorioController.create);
routes.delete('/gruposProvisorios/:id', GrupoProvisorioController.delete);
routes.put('/gruposProvisorios/:id', GrupoProvisorioController.update);

routes.get('/gruposFinais', GrupoFinalController.index);
routes.post('/gruposFinais', GrupoFinalController.create);

routes.get('/avaliacoes', AvaliacaoController.index);
routes.post('/avaliacoes', AvaliacaoController.create);
 
module.exports = routes; 