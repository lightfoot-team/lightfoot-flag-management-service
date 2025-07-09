import { type NewFlag } from "../types/flagTypes";
require('dotenv').config();
const { Client } = require('pg');

const FLAGS = process.env.TABLE_NAME;
async function executeQuery(statement: string, ...parameters: any[]) {
  const client = new Client({ 
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
    });
  try {
    await client.connect();
    
    const result = await client.query(statement, parameters);
    return result;
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }  
}


class DBPersistence {

  async getAllFlags() {
    const QUERY = `SELECT * FROM ${FLAGS}`
    const result = await executeQuery(QUERY);
    return result;
  }

  async deleteFlag(id: number) {
    const QUERY = `DELETE * FROM ${FLAGS} WHERE ID = $1`
    const result = await executeQuery(QUERY, id);
  }

  async addFlag(flag: NewFlag) {
    const {flagKey, flagType, variants, createdAt, defaultVariant} = flag;
    // console.log('fk', flagKey, flagType, variants, createdAt, defaultVariant)
    console.log(flag)
    const QUERY = `INSERT INTO ${FLAGS} (flag_key, flag_type, variants, created_at, default_variant)
                  VALUES ($1, $2, $3, $4, $5)`;
    const result = await executeQuery(QUERY, flag.flagKey, flag.flagType, flag.variants, flag.createdAt, flag.defaultVariant);
    return result;
  }

  async toggleFlagEnabled(id: number) {
    const QUERY = 
    `
      UPDATE TABLE ${FLAGS} SET is_enabled = !is_enabled
      WHERE id = $1
    `;
    const result = await executeQuery(QUERY, id);
    return result;
    
  }

  async toggleFlagValue(id: number, variant: string) {
    const QUERY = 
    `
      UPDATE TABLE ${FLAGS} SET default_variant = $1
      WHERE id = $2
    `;
    const result = await executeQuery(QUERY, variant, id);
    return result;
  }
}

export default DBPersistence;