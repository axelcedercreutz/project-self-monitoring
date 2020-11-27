
import { Client } from "../deps.js";
import { dbconfig } from "../config/config.js";

const getClient = () => {
  return new Client(dbconfig.database);
}

const executeQuery = async(query, ...args) => {
  const client = getClient();
  try {
    await client.connect();
    return await client.query(query, ...args);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
}

export { executeQuery };