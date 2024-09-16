import axios, { AxiosRequestConfig } from "axios";
const url: string = "http://localhost:5000/api";

const headers: AxiosRequestConfig["headers"] = {
  "Content-Type": "application/json",
};

interface User {
  id: string; // or number depending on your case
  [key: string]: any; // if you want to allow additional properties
}

export const loginUser = (user: object) =>
  axios.post(`${url}/auth/login`, user, { headers });

export const registerUser = (user: object) =>
  axios.post(`${url}/auth/signup`, user, { headers });

export const userUpdate = (user: User) =>
  axios.put(`${url}/user/update/${user?.id}`, user);

export const deleteUserAccount = (user: User) =>
  axios.delete(`${url}/user/delete/${user?._id}`);

export const signoutUser = () => axios.get(`${url}/auth/signout`);
