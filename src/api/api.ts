// src/api/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api/drivers",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
