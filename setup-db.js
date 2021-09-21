require('dotenv').config();
const pool = require('./lib/utils/pool');
const setup = require('./data/setup');
// const seed = require('./db/seed');

setup(pool);
//   .then(() => seed())
//   .catch((err) => console.error(err))
//   .finally(() => pool.end());
