import axios from "axios";
import { updateToken } from "../utils";


const APIHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    
  };
  
  export const APIuser = axios.create({
    baseURL: `http://localhost:8080/api/v1`,
    headers: APIHeaders,
    timeout: 600000,
  });
  
   APIuser.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${updateToken()}`;
      return config;
    })