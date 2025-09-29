import axios from "axios";

console.log('base url in axios', process.env.BASE_URL)

export const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL || 'http://localhost:3000'}/api`,
});