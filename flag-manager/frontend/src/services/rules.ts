import axios from 'axios';
import { type EvaluationRule } from '../types/evaluationTypes';
const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
  }
};
const baseURL = 'http://localhost:3000/api/flags/rule'


/**
 * Submits a POST request to the FlagManager API to create a new flag
 * from the provided details. Generates the createdAt property from the current
 * time at execution. 
 * @param flagFormDetails the flag details submitted by the user
 * @returns API response object containing the newly added flag
 */
export const addRule = async (rule: EvaluationRule) => {
    console.log('rule:', rule)
  const result = await axios.post(`${baseURL}`, {rule: rule}, axiosConfig);
  console.log('result:', result)
  return result;
}

export const getRules = async () => {
  return [{
      name: 'test rule (need to implement api call)',
      attribute: 'role',
      operator: '=',
      value: 'admin',
      flagKey: 'featured-park',
      variant: 'on'
  }]
}