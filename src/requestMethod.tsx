import axios from "axios";

const BASE_URL = "https://smartgarbageapi-production.up.railway.app/api/";
const BASE_MAPBOX_URL="https://api.mapbox.com/geocoding/v5/mapbox.places/";
let user: string;
 user = JSON.parse(localStorage.getItem("persist:root")||'')?.user;

const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token;
console.log(user)
console.log(TOKEN)
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Barier ${TOKEN}` },
});

export const geoCodingRequest = axios.create({
  baseURL: BASE_MAPBOX_URL,
});
