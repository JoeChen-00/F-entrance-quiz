import axios from 'axios';
import baseURL from './base';

// TODO GTB-4: + Api层工程实践做的比较好，划分的api比较清晰
const ApiHandler = {
  getAllStudent: async () => {
    const response = await axios.get(`${baseURL}/handler/All`);
    return response.data;
  },
  // TODO GTB-4: - 这里命名可以优化一下
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
