import axios from 'axios';
import { 
  type EvaluationRuleInsertion,
  type EvaluationRule
} from '../types/evaluationTypes';
const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
  }
};
const baseURL = 'http://localhost:3000/api/flags'


/**
 * Submits a POST request to the FlagManager API to create a new flag
 * from the provided details. Generates the createdAt property from the current
 * time at execution. 
 * @param flagFormDetails the flag details submitted by the user
 * @returns API response object containing the newly added flag
 */
export const addRule = async (rule: EvaluationRuleInsertion) => {
  const result = await axios.post(`${baseURL}/rule`, {rule: rule}, axiosConfig);
  return result;
}

export const getRulesByFlagKey = async (flagKey: string) => {
  const response = await axios.get(`${baseURL}/rules/${flagKey}`);
  return response.data as EvaluationRule[];
};

export const deleteRule = async (id:string, name: string) => {
  const result = await axios.delete(`${baseURL}/rule/${name}`);
  return result;
}