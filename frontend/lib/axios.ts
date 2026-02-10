import axios from 'axios';

// axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // 🔑 cookies HttpOnly
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default api;
