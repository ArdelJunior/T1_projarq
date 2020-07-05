const jwt = require("jsonwebtoken");
const config = require("../auth.config");
const connection = require("../../database/connection");
const Administrador = require("../../models/Administrador");
const Aluno = require("../../models/Aluno");
const RoleFactory = require("../../factories/RoleFactory");

module.exports = {
  verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).json({
        error: "Você não está logado",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: "Não autorizado",
        });
      }
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  },

  isAdministrador(req, res, next) {
    const { role, id } = req;
    const roles = ["administrador"];
    if (!roles.includes(role)) {
      return res.status(403).json({
        error: "Apenas administradores podem acessar esta área",
      });
    }

    const ac = RoleFactory.create(role);
    ac.get(id).then(() => {
      next();
    })
  },

  isAvaliador(req, res, next) {
    const { role, id } = req;
    const roles = ["administrador", "avaliador"];
    if (!roles.includes(role)) {
      return res.status(403).json({
        error: "Apenas avaliadores podem acessar esta área",
      });
    }

    const ac = RoleFactory.create(role);
    ac.get(id).then(() => {
      next();
    })
  },

  isAluno(req, res, next) {
    const { role, id } = req;
    const roles = ["administrador", "aluno"];
    if (!roles.includes(role)) {
      return res.status(403).json({
        error: "Apenas alunos podem acessar esta área",
      });
    }

    const ac = RoleFactory.create(role);
    ac.get(id).then(() => {
      next();
    })
  },
};
