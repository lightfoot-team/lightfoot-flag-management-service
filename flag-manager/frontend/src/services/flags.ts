import axios from 'axios';
import { type FlagFormDetails, 
  type FlagDetails,
  type ParsedFlagFormDetails,
  type TransformedFlagFormDetails,
  type Variant,
} from '../types/flagTypes';
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
export const addFlag = async (flagFormDetails: ParsedFlagFormDetails) => {
  const createdAt = new Date(Date.now()).toUTCString();
  // If the flag is a boolean type
  //  Grab the variants object
  //  Iterate over the keys 
  //  Convert each keys' value to its boolean type
  
  // const transformedFlag: TransformedFlagFormDetails = {};
  const variantsObject = flagFormDetails.variants;
  console.log(variantsObject);  
  if (flagFormDetails.flagType === "boolean") {
    Object.keys(variantsObject).forEach(key => {
      variantsObject[key] = variantsObject[key] === 'true';
    })
  }

  const flagDetails: FlagDetails = {...flagFormDetails, createdAt, isEnabled: false}
  const result = await axios.post(`${baseURL}/add`, flagDetails, axiosConfig);
  console.log('result:', result)
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