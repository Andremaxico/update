import axios from "axios";

console.log('base url in axios', process.env.BASE_URL)

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});