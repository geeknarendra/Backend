const express = require("express");

const { Op } = require("sequelize");
const sequelize = require("../database");
var Artist = require("../models/artist");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Artist.findAll({
      where: {
        Name: {
          [Op.like]: "%" + req.query.q + "%",
        },
      },
    });
    res.status(200).send({
      items: products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: true,
      message: "cannot process your request",
    });
  }
});

router.get("/trgm", (req, res) => {
  // for "hello" trgms would be " h", " he", "hel", "ell", "llo", "lo "
  sequelize
    .query("CREATE EXTENSION IF NOT EXISTS pg_trgm;")
    .then(() => {
      sequelize
        .query("select * from pg_extension where extname='pg_trgm';")
        .then(() => {
          Artist.findAll({
            attributes: {
              include: [
                [
                  sequelize.fn(
                    "similarity",
                    sequelize.col("Name"),
                    req.query.q
                  ),
                  "score",
                ],
              ],
            },
            where: [
              sequelize.where(
                sequelize.fn("similarity", sequelize.col("Name"), req.query.q),
                { [Op.gt]: 0.2 }
              ),
              // more where logics can be added here
              {},
            ],
          })
            .then((art) => res.status(200).send(art))
            .catch((error) => {
              console.log("coming in err", error);
              res.status(500).send(error);
            });
        });
    })
    .catch((error) => {
      console.log("coming inside err", error);
      res.status(500).send(error);
    });
});

router.get("/sound", async (req, res) => {
  try {
    // SOUNDEX will create a string of only 4
    const extension = await sequelize.query(
      "CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;"
    );
    const artist = await sequelize.query(`SELECT
      *
      FROM "Artists"
      WHERE "Nationality" IN ('American', 'British')
      AND SOUNDEX("Name") = SOUNDEX('${req.query.q}');`);
    res.status(200).send(artist);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/metaphone", async (req, res) => {
  try {
    const extension = await sequelize.query(
      "CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;"
    );
    const artist = await sequelize.query(`SELECT
      *
      FROM "Artists"
      WHERE "Nationality" = 'American'
      ORDER BY SIMILARITY(
        METAPHONE("Name",10),
          METAPHONE('${req.query.q}',10)
          ) DESC
      LIMIT 5;`);
    res.status(200).send(artist);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/distance", async (req, res) => {
  try {
    // the Levenshtein distance between two strings is the minimum number of edits required to transform one string into the other. 
    const extension = await sequelize.query(
      "CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;"
    );
    const artist = await sequelize.query(`SELECT
        *,
          LEVENSHTEIN("Name", '${req.query.q}')
      FROM "Artists"
      ORDER BY LEVENSHTEIN("Name", '${req.query.q}') ASC
      LIMIT 5;`);
    console.log("artist", artist);
    res.status(200).send(artist);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
