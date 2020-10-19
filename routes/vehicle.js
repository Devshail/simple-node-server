var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');

/* GET users listing. */
router.post('/register',(req,res,next) => UserController.signUp(req,res,next));

module.exports = router;