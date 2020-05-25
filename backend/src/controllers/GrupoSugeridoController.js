const connection = require("../database/connection");
const Aluno = require("../models/Aluno");
const { validateTimeSugerido, getPayload } = require("../helper/AlunoHelper");

module.exports = {
  async index(request, response) {
    const grupos = await connection("grupos_sugeridos").select("*");

    return response.json(grupos);
  },

  async findByAluno(request, response) {
    const { id } = request.params;
    const grupo = await connection("grupos_sugeridos")
      .where("idAluno1", "=", id)
      .first();

    if (!grupo) {
      return response.status(204);
    }

    const ids = [
      grupo.idAluno1,
      grupo.idAluno2,
      grupo.idAluno3,
      grupo.idAluno4,
      grupo.idAluno5,
    ];

    const alunos = await Promise.all(
      ids.map(async (e) => {
        const aluno = await Aluno.get(e);
        return aluno;
      })
    );

    return response.status(alunos.length > 0 ? 200 : 204).json(alunos);
  },

  async create(request, response) {
    const { aluno, time } = request.body;

    try {
      await validateTimeSugerido(aluno, time);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    const payload = getPayload(aluno, time);

    const [id] = await connection("grupos_sugeridos").insert(payload);

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const idAluno = request.headers.authorization;

    const grupo = await connection("grupos_sugeridos")
      .where("id", id)
      .select("idAluno1")
      .first();

    if (grupo.idAluno1 !== idAluno) {
      return response.status(401).json({ error: "Operação não permitida." });
    }

    await connection("grupos_sugeridos").where("id", id).delete();

    return response.status(204).send();
  },

  async update(request, response) {
    const { id } = request.params;
    const { aluno, time } = request.body;

    try {
      await validateTimeSugerido(aluno, time);
    } catch (err) {
      console.error(err);
      return response.status(400).json({ error: err.message });
    }

    const payload = getPayload(aluno, time);
    console.log(payload);

    const grupo = await connection("grupos_sugeridos")
      .where("id", id)
      .select("idAluno1")
      .first();

    if (grupo.idAluno1 !== aluno) {
      return response.status(401).json({ error: "Operação não permitida." });
    }

    await connection("grupos_sugeridos").where("id", id).update(payload);

    return response.status(201).json({ success: true });
  },
};
