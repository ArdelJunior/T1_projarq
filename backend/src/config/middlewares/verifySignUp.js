const connection = require("../../database/connection");
const Aluno = require("../../models/Aluno");

module.exports = {
  alunoAlreadyExists(req, res, next) {
    const ac = new Aluno();

    ac.getByMatricula(req.body.matricula).then((rs) => {
      if (rs) {
        res.status(400).send({
          error: "Esta matrícula já está em uso",
        });
      }
    });

    ac.getByEmail(req.body.email).then((rs) => {
      if (rs) {
        res.status(400).send({
          error: "Este e-mail já está em uso",
        });
      }
    });
  },
};
