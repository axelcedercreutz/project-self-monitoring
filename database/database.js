
import { Client, Pool } from "../deps.js";
import { dbconfig } from "../config/config.js";

const CONCURRENT_CONNECTIONS = 5;

const DATABASE_URL = Deno.env.toObject().DATABASE_URL || dbconfig.database;

const connectionPool = new Pool(DATABASE_URL, CONCURRENT_CONNECTIONS);

const getPort = () => {
  let port = 7777;
  if (Deno.args.length > 0) {
    const lastArgument = Deno.args[Deno.args.length - 1];
    port = Number(lastArgument);
  }
  return port;
}

const executeQuery = async(query, ...args) => {
  const client = await connectionPool.connect();
  try {
      return await client.query(query, ...args);
  } catch (e) {
      console.log(e);  
  } finally {
      client.release();
  }
  
  return null;
}

export { executeQuery, getPort };