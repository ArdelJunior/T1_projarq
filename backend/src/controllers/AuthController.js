const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AlunoFactory = require("../factories/AlunoFactory");
const Aluno = require("../models/Aluno");
const Administrador = require("../models/Administrador");
const Avaliador = require("../models/Avaliador");

module.exports = {
  signup(request, response) {
    const { matricula, nome, curso, email, password } = request.body;
    const afc = new AlunoFactory();
    afc
      .create(matricula, nome, curso, email, password)
      .then(() => {
        return response.json({ message: "Aluno registrado com sucesso" });
      })
      .catch((err) => {
        return response.status(500).json({ error: err.message });
      });
  },

  login(request, response) {
    const { email, password, role } = request.body;

    let ac;
    switch (role) {
      case "administrador":
        ac = new Administrador();
        break;
      case "avaliador":
        ac = new Avaliador();
        break;
      default:
        ac = new Aluno();
    }

    ac.getByEmail(email)
      .then((user) => {
        if (!user) {
          return response
            .status(401)
            .json({ error: "Usuário ou senha incorretos" });
        }

        ac.getPassword(user.id).then((p) => {
          const validPass = bcrypt.compareSync(password, p.password);
          if (!validPass) {
            return response
              .status(401)
              .json({ error: "Usuário ou senha incorretos" });
          }

          const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400,
          });

          const { id, nome, email, matricula, curso } = user;
          return response.json({
            id,
            nome,
            email,
            matricula,
            curso,
            accessToken: token,
          });
        });
      })
      .catch((err) => {
        return response.status(500).json({ error: err.message });
      });
  },
};
