const User = require("../models/user");
// const FileStorage = require("../storages/FileStorage");
const DbStorage = require("../storages/DbStorage");
const bcrypt = require("bcrypt")

// knowledge of how and where to store data
class UserRepository {
  constructor() {
    // this._storage = new FileStorage("students");
    this._storage = new DbStorage("users");
    // this._storage = new DbStorage("users", {columns})
  }

  async getAll() {
    try {
      const list = await this._storage.getAll();
      return list.map((storedData) => {
        const userModel = new User(storedData);
        return userModel.getData();
      });
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }

  async getById(id) {
    try {
      const storedData = await this._storage.getById(id);
      const userModel = new User(storedData);
      return userModel.getData();
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }

  // data == req.body
  async create(data) {
    try {
      let {name, password} = data
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt)
      const userModel = new User({
          name,
          password
      });
      // model used to validate and parse data
      console.log(userModel);
      const dataToStore = userModel.getDataForStorage();
      // save to storage and get back stored data (with id), update model's id
      const { id } = await this._storage.createUser(dataToStore);
      userModel.setId(id);
      return userModel.getData();
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }

  async update(id, data) {
    try {
      const userModel = new User(
        Object.assign({}, data, { id })
      );
      const dataToStore = userModel.getDataForStorage();
      await this._storage.update(dataToStore);
      return userModel.getData();
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }

  async delete(id) {
    try {
      return await this._storage.delete(id);
    } catch (error) {
      console.error("Error with storage: ", error);
    }
  }
}

module.exports = new UserRepository();