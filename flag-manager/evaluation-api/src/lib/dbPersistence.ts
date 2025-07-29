import { type Flag } from "../types/flagTypes";
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

  async getMatchingRules(flagKey: string) {
    //TODO: query rules table for all rules that match the given flag key and context kind
    const QUERY = 
    `SELECT * FROM rules JOIN rule_values
     ON rules.id = rule_values.rule_id
     WHERE rules.flag_key = $1
    `
    const result = await executeQuery(QUERY, flagKey);
    return result.rows;
    
  }

  async getRuleValues(ruleName: string) {
    const SELECT_RULE_QUERY = `SELECT * FROM rules WHERE rules.rule_name = $1`;
    const result = await executeQuery(SELECT_RULE_QUERY, ruleName);
    const ruleId = result.rows[0].id;
    const GET_VALUES_QUERY = `SELECT * FROM rule_values WHERE rule_values.rule_id = $1`
    const valuesResult = await executeQuery(GET_VALUES_QUERY, ruleId);
    return valuesResult.rows;
  }
}


export default DBPersistence;