const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "User" });
  }

  async create({ username, email, hashed_password, birthdate, gender }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, email, hashed_password, birthdate, gender) VALUES (?, ?, ?, ?, ?)`,
      [username, email, hashed_password, birthdate, gender]
    );

    const createdUserId = result.insertId;

    return createdUserId;
  }

  async readAll() {
    const [arrayOfAllUsers] = await this.database.query(
      `SELECT id, username, gender, profile_picture_file FROM ${this.table}`
    );

    return arrayOfAllUsers;
  }

  async read(id) {
    const [arrayOfSpecificUser] = await this.database.query(
      `SELECT username, gender, profile_picture_file FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return arrayOfSpecificUser;
  }

  async readByEmail(email) {
    const [arrayOfSpecificUser] = await this.database.query(
      `SELECT email, hashed_password FROM ${this.table} WHERE email = ?`,
      [email]
    );

    return arrayOfSpecificUser;
  }

  async update(
    id,
    {
      username,
      email,
      hashed_password,
      birthdate,
      gender,
      profile_picture_file,
    }
  ) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET username = COALESCE(?, username), email = COALESCE(?, email), hashed_password = COALESCE(?, hashed_password), birthdate = COALESCE(?, birthdate), gender = COALESCE(?, gender), profile_picture_file = COALESCE(?, profile_picture_file) WHERE id = ?`,
      [
        username,
        email,
        hashed_password,
        birthdate,
        gender,
        profile_picture_file,
        id,
      ]
    );

    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = UserManager;
