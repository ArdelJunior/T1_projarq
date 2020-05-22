const connection = require('../database/connection');
const existeAluno = require('../helper/existeAlunoHelper');
const cursoDiferente = require('../helper/cursoDiferenteHelper');

module.exports = {

    async index(request, response) {
        const grupos = await connection('gruposProvisorios').select('*');

        return response.json(grupos);
    },

    async create(request, response) {

        const { nomeGrupo, idAluno2, idAluno3, idAluno4, idAluno5 } = request.body;

        const idAluno1 = request.headers.authorization;

        if(await existeAluno.existeAluno([idAluno1, idAluno2, idAluno3, idAluno4, idAluno5]) == false){
            return response.status(400).json({ error: 'Há alguma ID de aluno incorreta, tente novamente.' });
        }

        if(await cursoDiferente.verificaCurso([idAluno1, idAluno2, idAluno3, idAluno4, idAluno5]) == false){
            return response.status(400).json({ error: 'É preciso ter no mínimo dois cursos diferentes.' });
        }
            
        const [id] = await connection('gruposProvisorios').insert({
            nomeGrupo,
            idAluno1,
            idAluno2,
            idAluno3,
            idAluno4,
            idAluno5
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const idAluno = request.headers.authorization;

        const grupo = await connection('gruposProvisorios')
            .where('id', id)
            .select('idAluno1')
            .first();

        if (grupo.idAluno1 !== idAluno) {
            return response.status(401).json({ error: 'Operação não permitida.' });
        }

        await connection('gruposProvisorios').where('id', id).delete();

        return response.status(204).send();
    },

    async alterar(request, response) {
        const { id } = request.params;
        const idAluno = request.headers.authorization;
        const {idAluno2, idAluno3, idAluno4, idAluno5} = request.body;

        if(await existeAluno.existeAluno([idAluno2, idAluno3, idAluno4, idAluno5]) == false){
            return response.status(400).json({ error: 'Há alguma ID de aluno incorreta, tente novamente.' });
        }

        const grupo = await connection('gruposProvisorios')
            .where('id', id)
            .select('idAluno1')
            .first();

        if (grupo.idAluno1 !== idAluno) {
            return response.status(401).json({ error: 'Operação não permitida.' });
        }

        await connection('gruposProvisorios')
        .where('id', id)
        .update({
            idAluno2: idAluno2,
            idAluno3: idAluno3,
            idAluno4: idAluno4,
            idAluno5: idAluno5
        });

        return response.status(200).json('Grupo modificado');


    },


};
