// TODO GTB-4: + 这里使用环境变量的baseURL启动，这样的工程时间做的比较好
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080'; // local
export default baseURL;
