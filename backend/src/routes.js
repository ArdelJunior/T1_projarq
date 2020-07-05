const express = require('express');
 
const AuthController = require('./controllers/AuthController');
const AlunoController = require('./controllers/AlunoController');
const AvaliadorController = require('./controllers/AvaliadorController');
const AlunoSessionController = require('./controllers/AlunoSessionController');
const AvaliacaoController = require('./controllers/AvaliacaoController');
const AvaliadorSessionController = require('./controllers/AvaliadorSessionController');
const CursoController = require('./controllers/CursoController');
const TimeController = require('./controllers/TimeController');
const TimeSugeridoController = require('./controllers/TimeSugeridoController');
const CriterioController = require('./controllers/CriterioController');
const AdministradorController = require('./controllers/AdministradorController');
const authJwt = require('./config/middlewares/authJwt');
// const CriterioController = require('./controllers/CriterioController');
 
const routes = express.Router();

routes.post('/login', AuthController.login);

routes.get('/alunos', [authJwt.verifyToken], AlunoController.index);
routes.get('/alunos/disponiveis', [authJwt.verifyToken], AlunoController.listUnassigned);
routes.get('/alunos/disponiveis/:id', [authJwt.verifyToken], AlunoController.listAvailable);
routes.get('/alunos/:id', [authJwt.verifyToken], AlunoController.get);
routes.post('/alunos', [authJwt.verifyToken], AlunoController.create);

routes.get('/avaliadores', AvaliadorController.index);
routes.post('/avaliadores', AvaliadorController.create);

routes.get('/adm', AdministradorController.index);
routes.post('/adm', AdministradorController.create);

routes.get('/avaliacoes', AvaliacaoController.index);
routes.get('/avaliacoes/time/:id', AvaliacaoController.getByTime);
routes.get('/avaliacoes/avaliador/:id', AvaliacaoController.getByAvaliador);
routes.post('/avaliacoes', AvaliacaoController.create);
routes.put('/avaliacoes', AvaliacaoController.update);
routes.delete('/avaliacoes/:id', AvaliacaoController.delete);

routes.get('/cursos', CursoController.index);

routes.get('/criterios', CriterioController.index);

routes.get('/times_sugeridos', [authJwt.verifyToken], TimeSugeridoController.index);
routes.get('/times_sugeridos/:id', [authJwt.verifyToken], TimeSugeridoController.get);
routes.post('/times_sugeridos', [authJwt.verifyToken], TimeSugeridoController.create);
routes.put('/times_sugeridos/:id', [authJwt.verifyToken], TimeSugeridoController.update)
routes.delete('/times_sugeridos/:id',[authJwt.verifyToken], TimeSugeridoController.delete);
routes.get('/times_sugeridos/aluno/:id', [authJwt.verifyToken], TimeSugeridoController.getByCriador);
routes.delete('/times_sugeridos/aluno/:id', [authJwt.verifyToken], TimeSugeridoController.deleteByCriador);

routes.get('/times', TimeController.index);
routes.get('/times/:id', TimeController.get);
routes.post('/times', TimeController.create);
routes.put('/times/:id', TimeController.update)
routes.delete('/times/:id', TimeController.delete);
routes.get('/times/avaliador/:id', TimeController.getByCriador);
routes.delete('/times/avaliador/:id', TimeController.deleteByCriador);

module.exports = routes; 