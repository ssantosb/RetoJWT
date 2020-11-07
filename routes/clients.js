var express = require('express');
var router = express.Router();
const middleware = require("../middleware");

const sendClientMember = (req, res)=>{
  if(req.decoded.role==='member' || req.decoded.role==='admin'){
    res.send([
      {name: "Cliente Miembro 1"}, {name: "Cliente Miembro 2"}, {name: "Cliente Miembro 3"}
    ]);
  }
  else{
    res.status(401).send({
      success: false, 
      message: "Unauthorized",
    })
  }
}

const sendClientSimple = (req, res)=>{
  if(req.decoded.role==='simple' || req.decoded.role==='admin'){
    res.send([
      {name: "Cliente Simple 1"}, {name: "Cliente Simple 2"}, {name: "Cliente Simple 3"}
    ]);
    }
    else{
      res.status(401).send({
        success: false, 
        message: "Unauthorized",
      })
    }
}

router.get('/simple', middleware.checkToken, sendClientSimple)
router.post('/member', middleware.checkToken, sendClientMember)

module.exports = router