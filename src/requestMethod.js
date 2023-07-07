import axios from "axios";

const BASE_URL = "https://hospital-backend-production-4a93.up.railway.app/api";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = (TOKEN) => axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

