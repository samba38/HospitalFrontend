import axios from "axios";

const api = axios.create({
  baseURL: "https://hospitalbackend-kipk.onrender.com",
  withCredentials: true, // 🔥 MUST stay true (cookies)
});

export default api;
