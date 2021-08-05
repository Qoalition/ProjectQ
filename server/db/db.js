const pg = require('pg')
const dotenv = require('dotenv').config()

let db;

(
  function connectToDatabase() {
    // We can run local DB or elephant SQL server DB depending on our env variable
    if (process.env.DATABASE === 'local') {
      console.log("DEBUG :: Connecting to local database")

      // Connect to a local DB
      // Instructions in the README how to set up a local DB.
      // To simplify things, we'll hardcode these variables in those instructions.
      db = new pg.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'qoalition',
        password: 'psqlsu',
        port: 5432,
      })
    } else if (process.env.DATABASE === 'server') {
      // Create the psostgress address to connect to
      const conString = `postgres://${process.env.SQL_DB_USERNAME}:${process.env.SQL_DB_PASSWORD}@chunee.db.elephantsql.com/${process.env.SQL_DB_USERNAME}`

      // Create a new postgres client
      db = new pg.Client(conString);

      // Connect to our DB server
      db.connect(function (err) {
        if (err) {
          return console.error('DEBUG :: ERROR CONNECTING TO DB!! => ', err);
        }
      });
    }
  }
)();

module.exports = db;
