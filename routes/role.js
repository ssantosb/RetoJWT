var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require("../config");
const middleware = require("../middleware");
const roleController = require('../controllers/roleController.js')

router.get('/', middleware.checkToken, roleController.getRoles)
router.post('/', roleController.crearRole)

module.exports = router;
