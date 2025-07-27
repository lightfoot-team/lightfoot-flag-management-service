import axios from 'axios';
import { 
  type FlagDetails,
  type Variant,
} from '../types/flagTypes';
import { z } from 'zod';
import { flagFormSchema } from '../types/newFlagZodSchema';

type FlagFormDetails = z.infer<typeof flagFormSchema>

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
 * from the provided details. 
 * @param flagFormDetails the flag details submitted by the user
 * @returns API response object containing the newly added flag
 */
export const addFlag = async (flagFormDetails: FlagFormDetails) => {
  const result = await axios.post(`${baseURL}/add`, flagFormDetails, axiosConfig);
  return result;
}

export const deleteFlag = async (flagKey: string) => {
  const result = await axios.delete(`${baseURL}/${flagKey}`);
  console.log('result:', result);
  return result;
}

export const toggleFlag = async (flagKey: string) => {
  const result = await axios.patch(`${baseURL}/toggle/${flagKey}`);
  return result;
}

export const getFlag = async (flagKey: string) => {
  const response = await axios.get(`${baseURL}/${flagKey}`);
  return response;
};