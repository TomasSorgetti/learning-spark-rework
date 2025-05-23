import axios from "axios";
import { authInstance, axiosInstance } from "./axiosInstances";

axios.defaults.withCredentials = true;

export const login = async ({ email, password, rememberme }) => {
  try {
    const res = await authInstance.post("/auth/signin", {
      email,
      password,
      rememberme,
    });

    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to login",
    };
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const res = await authInstance.post(`/auth/signup`, {
      name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to register",
    };
  }
};

export const verifyEmail = async ({ userId, code }) => {
  try {
    const res = await axiosInstance.patch(`/auth/verify`, {
      userId,
      code,
    });
    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to verify email",
    };
  }
};
export const resendCode = async (userId) => {
  try {
    const res = await axiosInstance.patch(`/auth/resend-code`, {
      userId,
    });

    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to resend code",
    };
  }
};

export const getProfile = async () => {
  try {
    const res = await axiosInstance.get(`/auth/me`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to get profile",
    };
  }
};

export const logoutSession = async () => {
  try {
    const res = await axiosInstance.post(`/auth/logout`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to get profile",
    };
  }
};
