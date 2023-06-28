import axios from "axios";

const BASE_URL = "https://hospital-backend-production-4a93.up.railway.app/api";
let user;
let currentUser;
if(localStorage.getItem("persist:root")){
  console.log(localStorage.getItem("persist:root"));
 user = JSON.parse(localStorage.getItem("persist:root")||'')?.user;
 currentUser = user && JSON.parse(user|| '').currentUser;
}
const TOKEN = currentUser?.accessToken|| '';
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

