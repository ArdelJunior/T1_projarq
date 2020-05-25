const express = require('express');
 
const AlunoController = require('./controllers/AlunoController');
const AvaliadorController = require('./controllers/AvaliadorController');
const GrupoSugeridoController = require('./controllers/GrupoSugeridoController');
const AlunoSessionController = require('./controllers/AlunoSessionController');
const GrupoFinalController = require('./controllers/GrupoFinalController');
const AvaliacaoController = require('./controllers/AvaliacaoController');
const AvaliadorSessionController = require('./controllers/AvaliadorSessionController');
const CursoController = require('./controllers/CursoController');
 
const routes = express.Router();
 
routes.post('/alunoSession', AlunoSessionController.login);

routes.post('/avaliadorSession', AvaliadorSessionController.login);

routes.get('/alunos', AlunoController.index);
routes.get('/alunos/:id', AlunoController.get);
routes.post('/alunos', AlunoController.create);

routes.get('/avaliadores', AvaliadorController.index);
routes.post('/avaliadores', AvaliadorController.create);

routes.get('/grupos_sugeridos', GrupoSugeridoController.index);
routes.post('/grupos_sugeridos', GrupoSugeridoController.create);
routes.delete('/grupos_sugeridos/:id', GrupoSugeridoController.delete);
routes.put('/grupos_sugeridos/:id', GrupoSugeridoController.update);

routes.get('/gruposFinais', GrupoFinalController.index);
routes.post('/gruposFinais', GrupoFinalController.create);

routes.get('/avaliacoes', AvaliacaoController.index);
routes.post('/avaliacoes', AvaliacaoController.create);

routes.get('/cursos', CursoController.index);

module.exports = routes; 