const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
console.log(uri);
const client = new MongoClient(uri, { useUnifiedTopology: true });
const dbName = 'db1';

module.exports.connectDb = async () => {
  await client.connect();
  await client.db(dbName);
  console.log("Connected succesfully to the Db!");
};

module.exports.mongoClient = client;