import axios from 'axios';
import baseURL from './base';

const ApiHandler = {
  getAllStudent: async () => {
    const response = await axios.get(`${baseURL}/handler/All`);
    return response.data;
  },
  getSequence: async () => {
    const response = await axios.get(`${baseURL}/handler/Sequence`);
    return response.data;
  },
  divideStudent: async () => {
    await axios.patch(`${baseURL}/handler/DivideStudent`);
  },
  addStudent: async (studentName) => {
    await axios.patch(`${baseURL}/handler/AddStudent/${studentName}`);
  },
};

export default ApiHandler;
