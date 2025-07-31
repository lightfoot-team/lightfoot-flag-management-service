import { type NewFlag, type Flag } from "../types/flagTypes";
import { type EvaluationRule } from "../types/evaluationTypes";
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

    let chars = key.split('_').filter(word => word.length > 0).map((word, index) => {
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

    const QUERY = `INSERT INTO ${FLAGS} (flag_key, flag_type, variants, created_at, default_variant)
                  VALUES ($1, $2, $3, $4, $5)`;
    const result = await executeQuery(QUERY, flagKey, flagType, variants, createdAt, defaultVariant);
    return result.rowCount;
  }

  async updateFlag(flag: NewFlag) {
    const { flagKey, variants, defaultVariant } = flag;

    const QUERY =
      `
      UPDATE ${FLAGS} 
      SET variants = $2, default_variant = $3, updated_at = NOW()
      WHERE flag_key = $1
    `;
    const result = await executeQuery(QUERY, flagKey, variants, defaultVariant);
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

  async addRule(rule: EvaluationRule) {
    const { name, attribute, operator, flagKey, variant } = rule;

    const QUERY = `INSERT INTO rules (rule_name, user_attribute, operator, flag_key, variant)
                  VALUES ($1, $2, $3, $4, $5)`;
    const result = await executeQuery(QUERY, name, attribute, operator, flagKey, variant);
    return result.rowCount;
  }

  async addRuleValues(name: string, values: Array<string>) {
    const SELECT_RULE_QUERY = `SELECT * FROM rules WHERE rules.rule_name = $1`;
    const result = await executeQuery(SELECT_RULE_QUERY, name);
    const ruleId = result.rows[0].id;
    const ADD_VALUES_QUERY = `INSERT INTO rule_values (val, rule_id) VALUES ($1, $2)`
    for (let val of values) {
      await executeQuery(ADD_VALUES_QUERY, val, ruleId);
    }
  }

  async getAllRulesByFlagKey(flagKey: string): Promise<EvaluationRule[]> {
    const RULES_QUERY = `SELECT id, rule_name, user_attribute, operator, flag_key, variant FROM rules WHERE flag_key = $1`;
    const rulesResult = await executeQuery(RULES_QUERY, flagKey);
    const rules = rulesResult.rows;
    const rulesWithValues: EvaluationRule[] = [];

    for (const rule of rules) {
      const VALUES_QUERY = `SELECT val FROM rule_values WHERE rule_id = $1`;
      const valuesResult = await executeQuery(VALUES_QUERY, rule.id);
      const values = valuesResult.rows.map((row: { val: string }) => row.val);
      const ruleWithValues: EvaluationRule = {
        name: rule.rule_name,
        attribute: rule.user_attribute,
        operator: rule.operator,
        values,
        flagKey: rule.flag_key,
        variant: rule.variant,
      };

      rulesWithValues.push(ruleWithValues);
    }

    return rulesWithValues;
  }

}

export default DBPersistence;