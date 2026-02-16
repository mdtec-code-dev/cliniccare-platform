import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve();
  });

  failedQueue = [];
};

async function refreshToken() {
 
  return api.post("/auth/refresh/");
}

/**
 * Logs en desarrollo
 */
if (process.env.NODE_ENV === "development") {
  api.interceptors.request.use(config => {
    console.log(
      `[API] ${config.method?.toUpperCase()} ${config.url}`,
      config.data ?? ""
    );
    return config;
  });

  api.interceptors.response.use(
    response => {
      console.log(
        `[API] ${response.status} ${response.config.url}`,
        response.data
      );
      return response;
    },
    error => {
      if (error.response) {
        console.error(
          `[API] ${error.response.status} ${error.config?.url}`,
          error.response.data
        );
      } else {
        console.error(`[API] Network error: ${error.message}`);
      }
      return Promise.reject(error);
    }
  );
}

/**
 * Interceptor de refresh automático
 */
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    // si es 401 y no es el refresh endpoint
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("auth/refresh") && 
      !originalRequest.url?.includes("auth/me")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // cola de requests mientras refresca
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        await refreshToken();
        processQueue(null);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        // aquí ya la sesión murió, puedes redirigir o limpiar cache
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
