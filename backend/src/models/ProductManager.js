/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ProductManager extends AbstractManager {
  constructor() {
    super({ table: "Product" });
  }

  async create({ image_file, name, description, price, stock_quantity }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (image_file, name, description, price, stock_quantity) VALUES (?, ?, ?, ?, ?)`,
      [image_file, name, description, price, stock_quantity]
    );

    const createdProductId = result.insertId;

    return createdProductId;
  }

  async readAll() {
    const [arrayOfAllProducts] = await this.database.query(
      `SELECT * FROM ${this.table}`
    );

    return arrayOfAllProducts;
  }

  async read(id) {
    const [arrayOfSpecificProduct] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return arrayOfSpecificProduct;
  }

  async update(id, { image_file, name, description, price, stock_quantity }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET image_file = COALESCE(?, image_file), name = COALESCE(?, name), description = COALESCE(?, description), price = COALESCE(?, price), stock_quantity = COALESCE(?, stock_quantity) WHERE id = ?`,
      [image_file, name, description, price, stock_quantity, id]
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

module.exports = ProductManager;
