var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require("../config");
const middleware = require("../middleware");
const loginsController = require('../controllers/loginController.js')

router.get('/', middleware.checkToken, loginsController.getLogins)
router.post('/', loginsController.crearLogin)

module.exports = router;
