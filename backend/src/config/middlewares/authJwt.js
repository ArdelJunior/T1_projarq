const jwt = require("jsonwebtoken");
const config = require("../auth.config");
const connection = require("../../database/connection");

module.exports = {
  verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        error: "Você não está logado",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          error: "Não autorizado",
        });
      }
      req.userId = decoded.id;
      next();
    });
  },
};
