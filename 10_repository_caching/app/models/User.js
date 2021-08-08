// all business and app logic about model goes here
class User {
    constructor(data) {
      // TODO: add validation
  
      this._data = Object.assign({}, data);
    }
  
  
    // used for views or other application parts except storage
    getData() {
      return Object.assign({}, this._data);
    }
  
    setId(id) {
      this._data.id = id;
    }
  
    /**
     * @returns data what should be stored
     */
    getDataForStorage() {
      const dataCopy = Object.assign({}, this._data);
      return dataCopy;
    }
  }
  
  module.exports = User;
  