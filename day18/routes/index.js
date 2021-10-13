var express = require('express');
var router = express.Router();
var registerInitialCheck = require('../middlewares/registerChecks');
var register = require("../controllers/register");
var Busboy = require("busboy");
var csv = require("fast-csv");
var Artist = require("../models/artist");
var path = require("path");
var fs = require("fs");
const sequelize = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  const sess = req.session;
  sess.username = 'rachit';
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res) {
  res.render('index', { title: JSON.stringify(req.session.user) })
});

router.get('/add-db', function(req, res) {
  require('../utils/init');
})

router.put('/csv', function(req, res) {
  console.log('coming in here')
  let tutorials = [];
  var busboy = new Busboy({ headers: req.headers });
    busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
      file.pipe(csv.parse({ headers: true })).on("data", function (data) {
        console.log("YAY, just the data I wanted!", data);
      });
    });
    busboy.on("finish", function () {
      console.log("Done parsing form!");
      res.status(200).end();
    });
    req.pipe(busboy);
});

router.get('/insert', function(req, res) {
  var tutorials = [];
  const pat = path.join(__dirname, "../public/csv/artists.csv");
  fs.createReadStream(pat)
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => {
    res.status(500).send(error);
  })
  .on("data", (row) => {
    tutorials.push(row);
  })
  .on("end", () => {
    console.log("coming in tuto", tutorials);
    Artist.bulkCreate(tutorials)
      .then(() => {
        res.status(200).send({
          message:
            "Uploaded the file successfully: " + req.file.originalname,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: "Fail to import data into database!",
          error: error.message,
        });
      });
  });
});

router.get('/see', async (req, res) => {
  try {
    const art = await Artist.findAll();
    res.status(200).send(art);
  } catch (err) {
    res.status(500).send(err);
  }
})

router.get('/delete', (req, res) => {
  sequelize.query('DROP TABLE "Artist"')
  .then(() => res.send("done"))
  .catch(() => res.send("err"))
})
/**
 * @requires { email, password, confirmPasswrod } - req.body
 * @description
 */
router.post('/register', registerInitialCheck, register);

module.exports = router;
