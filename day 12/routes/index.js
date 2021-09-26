var express = require('express');
var router = express.Router();
var registerInitialCheck = require('../middlewares/registerChecks')
var register = require('../controllers/register')

/* GET home page. */
router.get('/', function(req, res, next) {
  const session = req.session
  session.username = 'bivas'
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  console.log("Redis Value", req.session.username);
  res.render('index', { title: 'Express' });
});
 
 
/**
 * @requires {email, password, confirmPassword} - req.body
 * @description
 * Security, performance and edge cases
 * level - 01
 * email validate - @.
 * password validate
 * level - 02
 * JS / SQL
 * level - 03
 * check if email already ecists
 * password hash
 * email lowercase
 * save
 */

router.post('/register', registerInitialCheck, register)

module.exports = router;
