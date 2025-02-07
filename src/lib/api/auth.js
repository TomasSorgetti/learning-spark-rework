import axios from "axios";

const BASE_URL = "http://localhost:8080/v1";

export const login = async ({ email, password, rememberme }) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signin`, {
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
    const res = await axios.post(`${BASE_URL}/auth/signup`, {
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
    const res = await axios.patch(`${BASE_URL}/auth/verify`, {
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
