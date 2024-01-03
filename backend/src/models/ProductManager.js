/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ProductManager extends AbstractManager {
  constructor() {
    super({ table: "Product" });
  }

  async create({ image_url, name, description, price, stock_quantity }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (image_url, name, description, price, stock_quantity) VALUES (?, ?, ?, ?)`,
      [image_url, name, description, price, stock_quantity]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async update({ id, image_url, name, description, price, stock_quantity }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET image_url = ?, name = ?, description = ?, price = ?, stock_quantity = ? WHERE id = ?`,
      [image_url, name, description, price, stock_quantity, id]
    );

    return result.affectedRows === 1;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows === 1;
  }
}

module.exports = ProductManager;
