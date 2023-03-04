const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  insert(user) {
    return this.connection.query(
      `insert into ${UserManager.table} (firstname, lastname, password, email, phone_number, status, github_address) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.password,
        user.email,
        user.phone_number,
        user.status,
        user.github_address,
      ]
    );
  }

  findByMail(email) {
    return this.connection.query(
      `select * from ${UserManager.table} where email = ? `,
      [email]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${UserManager.table} set ? where id = ?`,
      [user, user.id]
    );
  }
}

module.exports = UserManager;
