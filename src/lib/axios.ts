import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('auth_token');

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
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