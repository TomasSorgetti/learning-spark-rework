import axios from "axios";
import { authInstance, axiosInstance } from "./axiosInstances";

axios.defaults.withCredentials = true;

export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get(`/users`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error to get users",
    };
  }
};

export const changePassword = async ({ password, newPassword }) => {
  try {
    const res = await axiosInstance.patch(
      `/users/change-password`,
      {
        password,
        newPassword,
      },
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {profile
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Error to change Password"
    );
  }
};
