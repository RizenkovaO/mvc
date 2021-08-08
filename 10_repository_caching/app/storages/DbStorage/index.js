const pool = require("./db");
const BaseStorage = require("../BaseStorage");

class DbStorage extends BaseStorage {
  constructor(tableName) {
    // if extendint another class then alwasy first need to call "super"
    super(tableName);
    // only after can call "this"
    this._table = tableName;
  }
  async getAll() {
    const [rows] = await pool.promise().execute(`SELECT * FROM ${this._table}`);
    return rows;
  }
  async getById(id) {
    const [rows] = await pool
      .promise()
      .execute(`SELECT * FROM ${this._table} WHERE id = ?`, [id]);
    return rows[0];
  }

  async create(data) {
    const [meta] = await pool
      .promise()
      .execute(
        `INSERT INTO ${this._table} (name, age, gender, lastname) VALUES (?, ?, ?, ?)`,
        [data.name, data.age, data.gender, data.lastname]
      );
    return Object.assign({}, data, { id: meta.insertId });
  }

  async createUser(data) {
    const [meta] = await pool
      .promise()
      .execute(
        `INSERT INTO ${this._table} (name, password) VALUES (?, ?)`,
        [data.name, data.password]
      );
    return Object.assign({}, data, { id: meta.insertId });
  }

  async update(data) {
    const { id } = data;
    if (!id) throw new Error(`Missing "id" in data for DbStorage.update`);
    await pool
      .promise()
      .execute(
        `UPDATE ${this._table} SET name=?, age=?, gender=?, lastname=? WHERE id = ?`,
        [data.name, data.age, data.gender, data.lastname, id]
      );
    return data;
  }
  async delete(id) {
    if (!id) throw new Error(`Missing "id" in data for DbStorage.delete`);
    await pool.promise().execute(`DELETE FROM ${this._table} WHERE id=?`, [id]);
    return;
  }
}

module.exports = DbStorage;
