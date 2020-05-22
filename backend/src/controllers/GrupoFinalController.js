const connection = require('../database/connection');
const existeAluno = require('../helper/existeAlunoHelper');
const cursoDiferente = require('../helper/cursoDiferenteHelper');

module.exports = {

    async index(request, response) {
        const grupos = await connection('gruposFinais').select('*');

        return response.json(grupos);
    },

    async create(request, response) {

        const { nomeGrupo, idAluno1, idAluno2, idAluno3, idAluno4, idAluno5 } = request.body;

        const idProfessor = request.headers.authorization;

        if(await existeAluno.existeAluno([idAluno1, idAluno2, idAluno3, idAluno4, idAluno5]) == false){
            return response.status(400).json({ error: 'Há alguma ID de aluno incorreta, tente novamente.' });
        }

        if(await cursoDiferente.verificaCurso([idAluno1, idAluno2, idAluno3, idAluno4, idAluno5]) == false){
            return response.status(400).json({ error: 'É preciso ter no mínimo dois cursos diferentes.' });
        }
            
        const [id] = await connection('gruposFinais').insert({
            nomeGrupo,
            idAluno1,
            idAluno2,
            idAluno3,
            idAluno4,
            idAluno5
        });

        return response.json({ id });
    },

};
