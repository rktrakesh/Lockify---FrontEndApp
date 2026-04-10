import useAuthStore from "@/auth/Store";
import { refreshToken } from "@/service/AuthService";
import axios from "axios";

const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_USER_URL || "http://localhost:2020/api/v1.0",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies in requests
  timeout: 10000,
});

ApiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let pendingRequest: any[] = [];

function queueRequest(cb: any) {
  pendingRequest.push(cb);
}

function resolveQueue(newToken: string) {
  pendingRequest.forEach((cb) => cb(newToken));
  pendingRequest = [];
}

ApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const errorMessage = error.response?.data?.message || "";

    // 1. IMMEDIATE REJECTION (The "No-Wait" Zone)
    // Don't intercept if:
    // - It's the Login or Register route
    // - It's a Social Provider mismatch (GitHub/Google)
    const isAuthRoute = original.url.includes("/auth/register");
    const isProviderMismatch = errorMessage.includes("GITHUB") || errorMessage.includes("GOOGLE");

    if (isAuthRoute || isProviderMismatch) {
      return Promise.reject(error); // This breaks the 'await' and stops the spinner
    }

    // 2. STANDARD 401 REFRESH LOGIC
    const is401 = error.response?.status === 401;

    // If it's not a 401, or we already tried to retry once, stop here.
    if (!is401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    // retry to refresh the token

    // if refreshing continues then we need to set all the request in the queue
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queueRequest((newToken: string) => {
          if (!newToken || newToken === "null") {
            return reject(error);
          }
          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(ApiClient(original));
        });
      });
    }

    // start refreshing

    isRefreshing = true;
    try {
      const loginResponse = await refreshToken();
      const newToken = loginResponse.accessToken;
      if (!newToken) {
        throw new Error("Unable to get refresh token.");
      }
      useAuthStore.getState().changeLocalLoginData(newToken, loginResponse.userDto, true);
      // resove pending queue
      resolveQueue(newToken);
      original.headers.Authorization = `Bearer ${newToken}`;
      return ApiClient(original);
    } catch (refreshError) {
      resolveQueue("null");
      useAuthStore.getState().logout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default ApiClient;
