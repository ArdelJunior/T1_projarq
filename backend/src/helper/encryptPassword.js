const bcrypt = require('bcrypt');

module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, 8);
  }
}