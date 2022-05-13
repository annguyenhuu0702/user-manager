import axiosService from "../config/index";
import { API } from "../constants/index";
const url = "users";

export const getAllUser = () => {
  return axiosService.get(`${API}/${url}`);
};

export const addUser = (data) => {
  return axiosService.post(`${API}/${url}`, data);
};

export const updateUser = (user) => {
  return axiosService.put(`${API}/${url}/${user.id}`, user);
};

export const deleteUser = (id) => {
  return axiosService.delete(`${API}/${url}/${id}`);
};
