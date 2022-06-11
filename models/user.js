const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    return getDb().collection("users").insertOne(this);
  }

  static findById(userId) {
    return getDb()
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
