const connection = require('../database/connection');
const { validateTimeFinal, getPayload } = require('../helper/AlunoHelper');

module.exports = {

    async index(request, response) {
        const grupos = await connection('gruposFinais').select('*');

        return response.json(grupos);
    },

    async create(request, response) {
        const { aluno, time } = request.body;

        try {
            await validateTimeFinal(aluno, time);
        } catch(err) {
            return response.status(400).json({error: err.message});
        }

        const payload = getPayload(aluno, time);

        const [id] = await connection('gruposFinais').insert(payload);

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('gruposFinais').where('id', id).delete();

        return response.status(204).send();
    },

    async update(request, response) {
        const { id } = request.params;
        const { aluno, time } = request.body;

        try {
            await validateTimeFinal(aluno, time);
        } catch(err) {
            console.error(err);
            return response.status(400).json({error: err.message});
        }

        const payload = getPayload(aluno, time);

        await connection('gruposFinais')
        .where('id', id)
        .update(payload);

        return response.status(201).json({success: true});
    },

};
