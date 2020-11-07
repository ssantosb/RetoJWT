const { mongoClient } = require("../lib/mongodb.js");
const ObjectId = require("mongodb").ObjectId;
const dbName = process.env.DB_NAME;
const collectionName = "roles";

exports.getRolesByName = async (req, res) => {
  const id = req.params.name;
  const login = await mongoClient
    .db(dbName)
    .collection(collectionName)
    .findOne({ name: id });
  if (!login) {
    res.status(404).send("No role with given name found");
    return;
  }
  res.send(login);
};


exports.getRoles = async (req, res) => {
  const logins = await mongoClient
    .db(dbName)
    .collection(collectionName)
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      if (!result) res.status(404).send("No se encontraron roles");
      res.send(result);
    });
};

exports.crearRole = async (req, res) => {
  if(req.decoded.role==='admin'){
  const newCliente = req.body;
  const create = await mongoClient
    .db(dbName)
    .collection(collectionName)
    .insertOne(newCliente)
    .then((data) => {
      res.send(data.ops)
    })
    .catch((err) => console.log(err));
  }
  else{
    res.send({
      success: false, 
      message: "Unauthorized. Only admins can do this",
    })
  }
};
