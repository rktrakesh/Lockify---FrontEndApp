import type RegisterData from "@/models/RegisterData";
import ApiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";

// for signup
export const registerUser = async (data: RegisterData) => {
  // api call to register user
  const response = await ApiClient.post("/auth/register", data);
  return response.data;
};

// for login
export const loginUser = async (data: LoginData) => {
  // api call to login user
  const response = await ApiClient.post<LoginResponseData>("/auth/login", data);
  return response.data;
};

// for logout
export const logoutUser = async () => {
  const response = await ApiClient.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async (emailId: string | undefined) => {
  const response = await ApiClient.get(`/users/email/${emailId}`);
  return response.data;
};

export const refreshToken = async () => {
  const response = await ApiClient.post<LoginResponseData>(`/auth/refresh`);
  return response.data;
};
