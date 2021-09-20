var express = require("express");
var router = express.Router();
var registerChecks = require("../middlewares/registerChecks");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.post('/register', )

module.exports = router;
