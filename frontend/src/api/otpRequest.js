import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
export const sendOtp = async (data) => {
  const res = await API.post("/auth/sendotp", { data });
  return res;
};
