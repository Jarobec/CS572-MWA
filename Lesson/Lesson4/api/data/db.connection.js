const MongoClient = require("mongodb").MongoClient;

let _connection = null;

const open = function () {
  if (get() == null) {
    MongoClient.connect(process.env.DB_URL, function (err, client) {
      if (err) {
        console.log("DB connection error", err);
        return;
      }
      _connection = client.db(process.env.DB_NAME);
      console.log("Connected to DB", process.env.DB_NAME);
    });
  }
};

const get = function () {
  console.log("Get connection");
  return _connection;
};

module.exports = {
  open,
  get,
};
