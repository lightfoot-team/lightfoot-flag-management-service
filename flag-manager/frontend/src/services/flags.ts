import axios from 'axios';
import { type FlagFormDetails, type FlagDetails } from '../types/flagTypes';
const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
  }
};
export const addFlag = async (flagFormDetails: FlagFormDetails) => {
  const createdAt = new Date(Date.now()).toUTCString();
  const flagDetails: FlagDetails = {...flagFormDetails, createdAt}
  const result = await axios.post('http://localhost:3000/api/flags/add', flagDetails, axiosConfig);
  console.log('result:', result)
  return result;
}