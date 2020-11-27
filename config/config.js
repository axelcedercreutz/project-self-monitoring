import { config } from '../deps.js';
let dbconfig = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  dbconfig.database = {};
} else {
  dbconfig.database = {
    hostname: config().hostname,
    database: config().database,
    user: config().user,
    password: config().password,
    port: Number(config().port)
  };
}

export { dbconfig }; 