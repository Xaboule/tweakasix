const AbstractManager = require("./AbstractManager");

class ProjectManager extends AbstractManager {
  static table = "project";

  insert(project) {
    return this.connection.query(
      `insert into ${ProjectManager.table} (title, description, sector, github_address, progress, debut_date, estimated_deadline) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        project.title,
        project.description,
        project.sector,
        project.github_address,
        project.progress,
        project.debut_date,
        project.estimated_deadline,
      ]
    );
  }

  update(project) {
    return this.connection.query(
      `update ${ProjectManager.table} set ? where id = ?`,
      [project, project.id]
    );
  }

  getTechnosProject(id) {
    return this.connection.query(
      `select name from techno
    inner join techno_project on techno.id = techno_project.techno_id
    inner join ${ProjectManager.table} on project.id = techno_project.project_id where project.id = ?`,
      [id]
    );
  }

  findAllDescription() {
    return this.connection.query(
      `select description from  ${ProjectManager.table}`
    );
  }
}
module.exports = ProjectManager;
