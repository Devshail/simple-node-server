var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');
const Validator = require('../validation/Validate')
/* GET users listing. */
router.post('/sign-up',(req,res,next) => UserController.signUp(req,res,next));
router.post('/login',(req,res,next)=>Validator.validateLogin(req,res,next),(req,res,next) => UserController.login(req,res,next));

module.exports = router;
