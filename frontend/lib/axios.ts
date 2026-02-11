import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

if (process.env.NODE_ENV === 'development') {
  api.interceptors.request.use((config) => {
    console.log(
      `[API] ${config.method?.toUpperCase()} ${config.url}`,
      config.data ?? '',
    );
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log(
        `[API] ${response.status} ${response.config.url}`,
        response.data,
      );
      return response;
    },
    (error) => {
      if (error.response) {
        console.error(
          `[API] ${error.response.status} ${error.config?.url}`,
          error.response.data,
        );
      } else {
        console.error(`[API] Network error: ${error.message}`);
      }
      return Promise.reject(error);
    },
  );
}

export default api;
