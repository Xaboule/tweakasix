const AbstractManager = require("./AbstractManager");

class CollaboratorManager extends AbstractManager {
  static table = "collaborator";

  insert(collaborator) {
    return this.connection.query(
      `insert into ${CollaboratorManager.table} (type, name, address, email, phone_number) values (?, ?, ?, ?, ?)`,
      [
        collaborator.type,
        collaborator.name,
        collaborator.address,
        collaborator.email,
        collaborator.phone_number,
      ]
    );
  }

  update(collaborator) {
    return this.connection.query(
      `update ${CollaboratorManager.table} set ? where id = ?`,
      [collaborator, collaborator.id]
    );
  }
}

module.exports = CollaboratorManager;
