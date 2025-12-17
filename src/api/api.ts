import axios from "axios";

const API = axios.create({
    baseURL: "https://telehealth-backend.onrender.com",
  });
  

export default API;