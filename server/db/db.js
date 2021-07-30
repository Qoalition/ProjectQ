const Pool = require('pg').Pool
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qoalition',
  password: 'psqlsu',
  port: 5432,
})

module.exports = db;