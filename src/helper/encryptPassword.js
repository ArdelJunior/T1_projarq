const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, 8);
  }
}