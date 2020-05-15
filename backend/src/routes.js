const express = require('express');
 
const AlunoController = require('./controllers/AlunoController');
const ProfessorController = require('./controllers/ProfessorController');
const GrupoController = require('./controllers/GrupoController');
 
const routes = express.Router();
 
routes.get('/alunos', AlunoController.index);
routes.post('/alunos', AlunoController.create);

routes.get('/professores', ProfessorController.index);
routes.post('/professores', ProfessorController.create);

routes.get('/grupos', GrupoController.index);
routes.post('/grupos', GrupoController.create);
routes.delete('/grupos/:id', GrupoController.delete);
routes.put('/grupos/:id', GrupoController.alterar);
 
module.exports = routes; 