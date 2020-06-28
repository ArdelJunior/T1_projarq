const express = require('express');
 
const AlunoController = require('./controllers/AlunoController');
const AvaliadorController = require('./controllers/AvaliadorController');
const AlunoSessionController = require('./controllers/AlunoSessionController');
const AvaliacaoController = require('./controllers/AvaliacaoController');
const AvaliadorSessionController = require('./controllers/AvaliadorSessionController');
const CursoController = require('./controllers/CursoController');
const TimeController = require('./controllers/TimeController');
const TimeSugeridoController = require('./controllers/TimeSugeridoController');
// const CriterioController = require('./controllers/CriterioController');
 
const routes = express.Router();
 
routes.post('/alunoSession', AlunoSessionController.login);

routes.post('/avaliadorSession', AvaliadorSessionController.login);

routes.get('/alunos', AlunoController.index);
routes.get('/alunos/:id', AlunoController.get);
routes.post('/alunos', AlunoController.create);

routes.get('/avaliadores', AvaliadorController.index);
routes.post('/avaliadores', AvaliadorController.create);

routes.get('/avaliacoes', AvaliacaoController.index);
routes.get('/avaliacoes/time/:id', AvaliacaoController.getByTime);
routes.post('/avaliacoes', AvaliacaoController.create);

routes.get('/cursos', CursoController.index);

routes.get('/times_sugeridos', TimeSugeridoController.index);
routes.get('/times_sugeridos/:id', TimeSugeridoController.get);
routes.post('/times_sugeridos', TimeSugeridoController.create);
routes.put('/times_sugeridos/:id', TimeSugeridoController.update)
routes.delete('/times_sugeridos/:id', TimeSugeridoController.delete);
routes.get('/times_sugeridos/aluno/:id', TimeSugeridoController.getByCriador);
routes.delete('/times_sugeridos/aluno/:id', TimeSugeridoController.deleteByCriador);

routes.get('/times', TimeController.index);
routes.get('/times/:id', TimeController.get);
routes.post('/times', TimeController.create);
routes.put('/times/:id', TimeController.update)
routes.delete('/times/:id', TimeController.delete);
routes.get('/times/avaliador/:id', TimeController.getByCriador);
routes.delete('/times/avaliador/:id', TimeController.deleteByCriador);

module.exports = routes; 