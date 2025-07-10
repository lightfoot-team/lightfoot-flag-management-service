import { type NewFlag, type Flag } from "../types/flagTypes";
require('dotenv').config();
const { Client } = require('pg');

/**
 * Transforms the keys of a given object from snake_case to camelCase
 * @param object the object to transform
 * @returns the new object with keys in camelCase format
 */
function setFlagKeysToCamelCase(object: Record<string, any>) {
  const newObject: Record<string, any> = {}
  const keys = Object.keys(object)
  const newKeys = keys.map(key => {
    // If underscore found => delete it, and capitalize the next char 

    let chars = key.split('_').filter(word=> word.length > 0).map((word, index) => {
      if (index > 0) {
        const newWord = word.charAt(0).toUpperCase().concat(word.slice(1).toLowerCase())
        return newWord
      }
      return word
    });
    const newKey = chars.join('');
    newObject[newKey] = object[key]
  });
  
  return newObject
}

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
    const QUERY = `SELECT flag_key, flag_type, variants, created_at, updated_at, default_variant, is_enabled FROM ${FLAGS}`
    const result = await executeQuery(QUERY);
    
    
    return result.rows.map((row: Flag) => {
      return setFlagKeysToCamelCase(row)
    });
  }

  async getFlagByKey(flagKey: string) {
    const QUERY = `SELECT flag_key, flag_type, variants, created_at, updated_at, default_variant, is_enabled FROM ${FLAGS}
                    WHERE flag_key = $1`;
    const result = await executeQuery(QUERY, flagKey);
    return result.rows.length > 0 ? setFlagKeysToCamelCase(result.rows[0]) : null;
  }

  async deleteFlag(flagKey: string) {
    const QUERY = `DELETE FROM ${FLAGS} WHERE flag_key = $1`
    const result = await executeQuery(QUERY, flagKey);
    return result;
  }

  async addFlag(flag: NewFlag) {
    const { flagKey, flagType, variants, createdAt, defaultVariant } = flag;

    console.log(flag)
    const QUERY = `INSERT INTO ${FLAGS} (flag_key, flag_type, variants, created_at, default_variant)
                  VALUES ($1, $2, $3, $4, $5)`;
    const result = await executeQuery(QUERY, flag.flagKey, flag.flagType, flag.variants, flag.createdAt, flag.defaultVariant);
    return result;
  }

  async toggleFlagEnabled(flagKey: string) {
    const QUERY =
      `
      UPDATE ${FLAGS} SET is_enabled = NOT is_enabled
      WHERE flag_key = $1
    `;
    const result = await executeQuery(QUERY, flagKey);
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