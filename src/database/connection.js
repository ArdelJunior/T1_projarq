const knex = require("knex");
const configuration = require("../../knexfile");

const connection = knex(
  process.env.ENV === "PROD"
    ? configuration.production
    : configuration.development
);

module.exports = connection;
