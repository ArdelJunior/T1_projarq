const express = require('express');

const authJwt = require('./config/middlewares/authJwt');
const AuthController = require('./controllers/AuthController');
const AlunoController = require('./controllers/AlunoController');
const AvaliadorController = require('./controllers/AvaliadorController');
const AvaliacaoController = require('./controllers/AvaliacaoController');
const CursoController = require('./controllers/CursoController');
const TimeController = require('./controllers/TimeController');
const TimeSugeridoController = require('./controllers/TimeSugeridoController');
const CriterioController = require('./controllers/CriterioController');
const AdministradorController = require('./controllers/AdministradorController');

const routes = express.Router();

// Rotas públicas
routes.post('/login', AuthController.login);
routes.post('/signup', AuthController.signup);

// Permissão para Aluno
routes.get('/criterios', [authJwt.verifyToken], CriterioController.index);
routes.get('/cursos', [authJwt.verifyToken, authJwt.isAluno], CursoController.index);

routes.get('/alunos', [authJwt.verifyToken, authJwt.isAluno], AlunoController.index);
routes.get('/alunos/disponiveis', [authJwt.verifyToken, authJwt.isAluno], AlunoController.listUnassigned);
routes.get('/alunos/disponiveis/:id', [authJwt.verifyToken, authJwt.isAluno], AlunoController.listAvailable);
routes.get('/alunos/:id', [authJwt.verifyToken, authJwt.isAluno], AlunoController.get);

routes.get('/times_sugeridos/aluno', [authJwt.verifyToken, authJwt.isAluno], TimeSugeridoController.getByCriador);
routes.get('/times_sugeridos/:id', [authJwt.verifyToken, authJwt.isAluno], TimeSugeridoController.get);
routes.post('/times_sugeridos', [authJwt.verifyToken, authJwt.isAluno], TimeSugeridoController.create);
routes.put('/times_sugeridos/:id', [authJwt.verifyToken, authJwt.isAluno], TimeSugeridoController.update)
routes.delete('/times_sugeridos/:id',[authJwt.verifyToken, authJwt.isAluno], TimeSugeridoController.delete);
// routes.delete('/times_sugeridos/aluno/:id', [authJwt.verifyToken, authJwt.isAluno], TimeSugeridoController.deleteByCriador);

// Permissão para Avaliador
routes.get('/avaliacoes/avaliador', [authJwt.verifyToken, authJwt.isAvaliador], AvaliacaoController.getByAvaliador);
routes.post('/avaliacoes', [authJwt.verifyToken, authJwt.isAvaliador], AvaliacaoController.create);
routes.put('/avaliacoes/:id', [authJwt.verifyToken, authJwt.isAvaliador], AvaliacaoController.update);
routes.delete('/avaliacoes/:id', [authJwt.verifyToken, authJwt.isAvaliador], AvaliacaoController.delete);

routes.get('/times/disponiveis', [authJwt.verifyToken, authJwt.isAvaliador], TimeController.getNaoAvaliados);

// Permissão para Administrador
routes.post('/alunos', [authJwt.verifyToken, authJwt.isAdministrador], AlunoController.create);
routes.delete('/alunos/:id', [authJwt.verifyToken, authJwt.isAdministrador], AlunoController.delete);

routes.get('/avaliadores', [authJwt.verifyToken, authJwt.isAdministrador], AvaliadorController.index);
routes.post('/avaliadores', [authJwt.verifyToken, authJwt.isAdministrador], AvaliadorController.create);
routes.delete('/avaliadores/:id', [authJwt.verifyToken, authJwt.isAdministrador], AvaliadorController.delete);

routes.get('/adm', [authJwt.verifyToken, authJwt.isAdministrador], AdministradorController.index);
routes.post('/adm', [authJwt.verifyToken, authJwt.isAdministrador], AdministradorController.create);

routes.get('/avaliacoes', [authJwt.verifyToken, authJwt.isAdministrador], AvaliacaoController.index);
routes.get('/avaliacoes/time/:id', [authJwt.verifyToken, authJwt.isAdministrador], AvaliacaoController.getByTime);
routes.get('/avaliacoes/avaliador/:id', [authJwt.verifyToken, authJwt.isAdministrador], AvaliacaoController.getByAvaliadorAdmin);

routes.get('/times_sugeridos', [authJwt.verifyToken, authJwt.isAdministrador], TimeSugeridoController.index);
routes.get('/times_sugeridos/aluno/:id', [authJwt.verifyToken, authJwt.isAdministrador], TimeSugeridoController.getByCriadorAdmin);


routes.get('/times', [authJwt.verifyToken, authJwt.isAdministrador], TimeController.index);
routes.get('/times/:id', [authJwt.verifyToken, authJwt.isAdministrador], TimeController.get);
routes.post('/times', [authJwt.verifyToken, authJwt.isAdministrador], TimeController.create);
routes.put('/times/:id', [authJwt.verifyToken, authJwt.isAdministrador], TimeController.update)
routes.delete('/times/:id', [authJwt.verifyToken, authJwt.isAdministrador], TimeController.delete);

// routes.get('/times/avaliador/:id', TimeController.getByCriador);
// routes.delete('/times/avaliador/:id', TimeController.deleteByCriador);

module.exports = routes; 