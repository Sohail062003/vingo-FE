import axios from "axios";


const apiInterceptor = axios.create({
  baseURL: "http://localhost:4200/api",
  withCredentials: true,
});

export default apiInterceptor;