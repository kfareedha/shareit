import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
export const verifyotp = (data) => API.post("/auth/verifyotp", { data });
