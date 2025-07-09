import axios from 'axios';
import { type FlagFormDetails, type FlagDetails } from '../types/flagTypes';
const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
  }
};
const baseURL = 'http://localhost:3000/api/flags'
/**
 * Submits a GET request to the FlagManager API to retrieve 
 * all existing flags 
 * @returns API response object containing an Array of all flags
 */
export const getAllFlags = async() => { 
  const response = await axios.get(`${baseURL}/all`);
  return response;
}

/**
 * Submits a POST request to the FlagManager API to create a new flag
 * from the provided details. Generates the createdAt property from the current
 * time at execution. 
 * @param flagFormDetails the flag details submitted by the user
 * @returns API response object containing the newly added flag
 */
export const addFlag = async (flagFormDetails: FlagFormDetails) => {
  const createdAt = new Date(Date.now()).toUTCString();
  const flagDetails: FlagDetails = {...flagFormDetails, createdAt}
  const result = await axios.post(`${baseURL}/add`, flagDetails, axiosConfig);
  console.log('result:', result)
  return result;
}

export const deleteFlag = async (flagKey: string) => {
  const result = await axios.delete(`${baseURL}/delete/${flagKey}`);
  console.log('result:', result);
  return result;
}