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
routes.post('/api/login', AuthController.login);
routes.post('/api/signup', AuthController.signup);

// Permissão para Aluno
routes.get('/api/criterios', [authJwt.verifyToken], CriterioController.index);
routes.get('/api/cursos', [authJwt.verifyToken, authJwt.isAluno], CursoController.index);

routes.get('/api/alunos', [authJwt.verifyToken, authJwt.isAluno], AlunoController.index);
routes.get('/api/alunos/disponiveis', [authJwt.verifyToken, authJwt.isAluno], AlunoController.listUnassigned);
routes.get('/api/alunos/disponiveis/:id', [authJwt.verifyToken, authJwt.isAluno], AlunoController.listAvailable);
routes.get('/api/alunos/:id', [authJwt.verifyToken, authJwt.isAluno], AlunoController.get);

routes.get('/api/times_sugeridos/aluno', [authJwt.verifyToken, authJwt.isAluno], TimeSugeridoController.getByCriador);
routes.get('/api/times_sugeridos/:id', [authJwt.verifyToken, authJwt.isAluno], TimeSugeridoController.get);
routes.post('/api/times_sugeridos', [authJwt.verifyToken, authJwt.isAluno], TimeSugeridoController.create);
routes.put('/api/times_sugeridos/:id', [authJwt.verifyToken, authJwt.isAluno], TimeSugeridoController.update)
routes.delete('/api/times_sugeridos/:id',[authJwt.verifyToken, authJwt.isAluno], TimeSugeridoController.delete);
// routes.delete('/api/times_sugeridos/aluno/:id', [authJwt.verifyToken, authJwt.isAluno], TimeSugeridoController.deleteByCriador);

// Permissão para Avaliador
routes.get('/api/avaliacoes/avaliador', [authJwt.verifyToken, authJwt.isAvaliador], AvaliacaoController.getByAvaliador);
routes.post('/api/avaliacoes', [authJwt.verifyToken, authJwt.isAvaliador], AvaliacaoController.create);
routes.put('/api/avaliacoes/:id', [authJwt.verifyToken, authJwt.isAvaliador], AvaliacaoController.update);
routes.delete('/api/avaliacoes/:id', [authJwt.verifyToken, authJwt.isAvaliador], AvaliacaoController.delete);

routes.get('/api/times/disponiveis', [authJwt.verifyToken, authJwt.isAvaliador], TimeController.getNaoAvaliados);

// Permissão para Administrador
routes.post('/api/alunos', [authJwt.verifyToken, authJwt.isAdministrador], AlunoController.create);
routes.delete('/api/alunos/:id', [authJwt.verifyToken, authJwt.isAdministrador], AlunoController.delete);

routes.get('/api/avaliadores', [authJwt.verifyToken, authJwt.isAdministrador], AvaliadorController.index);
routes.post('/api/avaliadores', [authJwt.verifyToken, authJwt.isAdministrador], AvaliadorController.create);
routes.delete('/api/avaliadores/:id', [authJwt.verifyToken, authJwt.isAdministrador], AvaliadorController.delete);

routes.get('/api/adm', [authJwt.verifyToken, authJwt.isAdministrador], AdministradorController.index);
routes.post('/api/adm', [authJwt.verifyToken, authJwt.isAdministrador], AdministradorController.create);

routes.get('/api/avaliacoes', [authJwt.verifyToken, authJwt.isAdministrador], AvaliacaoController.index);
routes.get('/api/avaliacoes/time/:id', [authJwt.verifyToken, authJwt.isAdministrador], AvaliacaoController.getByTime);
routes.get('/api/avaliacoes/avaliador/:id', [authJwt.verifyToken, authJwt.isAdministrador], AvaliacaoController.getByAvaliadorAdmin);

routes.get('/api/times_sugeridos', [authJwt.verifyToken, authJwt.isAdministrador], TimeSugeridoController.index);
routes.get('/api/times_sugeridos/aluno/:id', [authJwt.verifyToken, authJwt.isAdministrador], TimeSugeridoController.getByCriadorAdmin);


routes.get('/api/times', [authJwt.verifyToken, authJwt.isAdministrador], TimeController.index);
routes.get('/api/times/:id', [authJwt.verifyToken, authJwt.isAdministrador], TimeController.get);
routes.post('/api/times', [authJwt.verifyToken, authJwt.isAdministrador], TimeController.create);
routes.put('/api/times/:id', [authJwt.verifyToken, authJwt.isAdministrador], TimeController.update)
routes.delete('/api/times/:id', [authJwt.verifyToken, authJwt.isAdministrador], TimeController.delete);

// routes.get('/api/times/avaliador/:id', TimeController.getByCriador);
// routes.delete('/api/times/avaliador/:id', TimeController.deleteByCriador);

module.exports = routes; 