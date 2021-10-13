var express = require('express');
var router = express.Router();

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456789',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM "Users" where id=$1 and email=$2', [request.query.id, request.query.email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/* GET users listing. */
router.get('/', getUsers);

module.exports = router;
