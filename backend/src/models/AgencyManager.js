const AbstractManager = require("./AbstractManager");

class AgencyManager extends AbstractManager {
  static table = "agency";

  insert(agency) {
    return this.connection.query(
      `insert into ${AgencyManager.table} (city, address, phone_number) values (?, ?, ?)`,
      [agency.city, agency.address, agency.phone_number]
    );
  }

  update(agency) {
    return this.connection.query(
      `update ${AgencyManager.table} set ? where id = ?`,
      [agency, agency.id]
    );
  }
}

module.exports = AgencyManager;
