import axios from 'axios';

// Base URL of your backend
const API_BASE = 'http://localhost:5002/api/drivers';

export const signupDriver = async (data: {
  name: string;
  phoneNumber: string;
  aadhaarNumber: string;
  busNumber: string;
}): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE}/signup`, data);
    // backend returns driver._id as driverId
    return response.data.driverId;
  } catch (error: any) {
    console.error('Signup error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.msg || 'Signup failed');
  }
};
