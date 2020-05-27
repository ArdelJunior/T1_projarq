const connection = require("../database/connection");
const Aluno = require("../models/Aluno");
const TimeSugerido = require("../models/TimeSugerido");
const { validateTimeSugerido, getPayload } = require("../helper/AlunoHelper");

module.exports = {
  async index(request, response) {
    try {
      const times = await TimeSugerido.list();
      return response.json(times);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async findByAluno(request, response) {
    const { id } = request.params;
    try {
      const time = await TimeSugerido.getByAluno(id);
      return response.json(time);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async create(request, response) {
    const { criado_por, alunos } = request.body;

    try {
      await TimeSugerido.new(criado_por, alunos);
      return response.status(201).json({ success: true });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    // const { aluno, time } = request.body;

    // try {
    //   await validateTimeSugerido(aluno, time);
    // } catch (err) {
    //   return response.status(400).json({ error: err.message });
    // }

    // try {
    //   const payload = getPayload(aluno, time);
    //   console.log({ time, payload });
    //   const id = await connection("grupos_sugeridos").insert(payload);
    //   return response.json({ id });
    // } catch (err) {
    //   return response.status(400).json({ error: err.message });
    // }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await TimeSugerido.delete(id);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
    // const idAluno = request.headers.authorization;

    // const grupo = await connection("grupos_sugeridos")
    //   .where("id", id)
    //   .select("idAluno1")
    //   .first();

    // if (grupo.idAluno1 !== idAluno) {
    //   return response.status(401).json({ error: "Operação não permitida." });
    // }

    // await connection("grupos_sugeridos").where("id", id).delete();

    return response.status(204).send();
  },

  async deleteByAluno(request, response) {
    const { id } = request.params;

    try {
      await TimeSugerido.deleteByAluno(id);
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { alunos } = request.body;

    try {
      await TimeSugerido.update(id, alunos);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
    // const { aluno, time } = request.body;

    // try {
    //   await validateTimeSugerido(aluno, time);
    // } catch (err) {
    //   console.error(err);
    //   return response.status(400).json({ error: err.message });
    // }

    // const grupo = await connection("grupos_sugeridos")
    //   .where("id", id)
    //   .select("idAluno1")
    //   .first();

    // if (grupo.idAluno1 !== aluno) {
    //   return response.status(401).json({ error: "Operação não permitida." });
    // }

    // const payload = getPayload(aluno, time);

    // await connection("grupos_sugeridos").where("id", id).update(payload);

    return response.status(201).json({ success: true });
  },
};
