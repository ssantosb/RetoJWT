const { mongoClient } = require("../lib/mongodb.js");
const dbName = 'db1';
const collectionName = "login";
const bcrypt = require('bcrypt')

exports.getLoginByName = async (req, res) => {
 
    if(req.decoded.role === 'admin'){
        const id = req.params.username;
        const login = await mongoClient
          .db(dbName)
          .collection(collectionName)
          .findOne({ username: id });
        if (!login) {
          res.status(404).send("No login with given id found");
          return;
        }
        res.send(login);
          }
      else{
          res.status(401).send({
              success: false,
              message: 'Unauthorized'
            })
            return
      }
};

  

exports.getLogins = async (req, res) => {

if(req.decoded.role === 'member' || req.decoded.role === 'admin'){
  const logins = await mongoClient
    .db(dbName)
    .collection(collectionName)
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      if (!result) res.status(404).send("No se encontraron logins");
      res.send(result);
    });
}
else{
    res.status(401).send({
        success: false,
        message: 'Unauthorized'
      })
      return
}
};

exports.crearLogin = async (req, res) => {

  if (!req.body.username || !req.body.role || !req.body.password) {
    res.status(400).send({
      success: false,
      massage: 'Información incompleta'
    })
    return
  }

  bcrypt.hash(req.body.password, 8, async (err, hash) => {
    if (err) {
      console.log(err)
      res.status(500).send({
        success: false,
        message: 'No se puede hacer hash'
      })
      return
    }

    const result = await mongoClient
      .db(dbName)
      .collection(collectionName)
      .insertOne({
        username: req.body.username,
        password: hash,
        role: req.body.role
      })

    res.send(result.ops)
  })
};

