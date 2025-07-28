import axios from 'axios';
const axiosConfig = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_GRAFANA_TOKEN}`
  }
};

const baseURL = '/apis/dashboard.grafana.app/v1beta1/namespaces/default/dashboards'

export const createDashboard = async(body) => {
  try {
    const response = await axios.post(baseURL, body, axiosConfig);
    return response;
  } catch (error: any) {
    if (error.status !== 409) {
      console.error("Create Dashboard error:", error);
    }
    
  }
}
export const getDashboard = async(uid: string) => {
  try {
    const response = await axios.get(`${baseURL}/${uid}`, axiosConfig);
    return response
  } catch (error) {
    console.error("Get Dashboard error", error)
  }
}
