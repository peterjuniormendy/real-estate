import axios, { AxiosRequestConfig } from "axios";
const url: string = "http://localhost:5000/api/auth";

// interface Headers {
//     'Content-Type': string;
// }

const headers: AxiosRequestConfig["headers"] = {
  "Content-Type": "application/json",
};

export const loginUser = (user: object) =>
  axios.post(`${url}/login`, user, { headers });
