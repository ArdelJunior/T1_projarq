const express = require('express');
 
const AlunoController = require('./controllers/AlunoController');
const AvaliadorController = require('./controllers/AvaliadorController');
// const GrupoSugeridoController = require('./controllers/GrupoSugeridoController');
const AlunoSessionController = require('./controllers/AlunoSessionController');
// const GrupoFinalController = require('./controllers/GrupoFinalController');
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

// routes.get('/grupos_sugeridos', GrupoSugeridoController.index);
// routes.post('/grupos_sugeridos', GrupoSugeridoController.create);
// routes.delete('/grupos_sugeridos/:id', GrupoSugeridoController.delete);
// routes.delete('/grupos_sugeridos/aluno/:id', GrupoSugeridoController.deleteByAluno);
// routes.put('/grupos_sugeridos/:id', GrupoSugeridoController.update);

// routes.get('/grupos_sugeridos_aluno/:id', GrupoSugeridoController.findByAluno);

// routes.get('/grupos_finais', GrupoFinalController.index);
// routes.post('/grupos_finais', GrupoFinalController.create);

// routes.get('/grupos_finais_aluno/:id', GrupoFinalController.findByAluno);

routes.get('/avaliacoes', AvaliacaoController.index);
routes.get('/avaliacoes/time/:id', AvaliacaoController.getByTime);
routes.post('/avaliacoes', AvaliacaoController.create);

routes.get('/cursos', CursoController.index);

routes.get('/times_sugeridos', TimeSugeridoController.index);
routes.get('/times_sugeridos/:id', TimeSugeridoController.get);
routes.post('/times_sugeridos', TimeSugeridoController.create);
routes.put('/times_sugeridos/:id', TimeSugeridoController.update)
routes.delete('/times_sugeridos/:id', TimeSugeridoController.delete);
routes.get('/times_sugeridos/aluno/:id', TimeSugeridoController.getByAluno);
routes.delete('/times_sugeridos/aluno/:id', TimeSugeridoController.deleteByAluno);

routes.get('/times', TimeController.index);
routes.get('/times/:id', TimeController.get);
routes.post('/times', TimeController.create);
routes.put('/times/:id', TimeController.update)
routes.delete('/times/:id', TimeController.delete);
routes.get('/times/avaliador/:id', TimeController.getByAvaliador);
routes.delete('/times/avaliador/:id', TimeController.deleteByAvaliador);

module.exports = routes; 