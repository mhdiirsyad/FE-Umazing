import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('auth_token');
const baseURL = import.meta.env.VITE_BACKEND_URL

console.log(baseURL)

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
)

export default instance;