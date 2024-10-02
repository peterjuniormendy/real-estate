import axios, { AxiosRequestConfig } from "axios";
const url: string = "http://localhost:5000/api";

const headers: AxiosRequestConfig["headers"] = {
  "Content-Type": "application/json",
};

interface User {
  username: string; // or number depending on your case
  [key: string]: any; // if you want to allow additional properties
}

interface Listing {
  name: string;
  [key: string]: any;
}

// Add withCredentials to ensure cookies are sent
export const loginUser = (user: object) =>
  axios.post(`${url}/auth/login`, user, {
    headers,
    withCredentials: true, // Important for sending/receiving cookies
  });

export const registerUser = (user: object) =>
  axios.post(`${url}/auth/signup`, user, {
    headers,
  });

export const googleSignin = (user: object) =>
  axios.post(`${url}/auth/google`, user, {
    headers,
    withCredentials: true,
  });

export const userUpdate = (user: User) =>
  axios.put(`${url}/user/update/${user?.id}`, user, {
    headers,
    withCredentials: true,
  });

export const deleteUserAccount = (user: User) =>
  axios.delete(`${url}/user/delete/${user?._id}`, {
    headers,
    withCredentials: true,
  });

export const signoutUser = () =>
  axios.get(`${url}/auth/signout`, {
    headers,
    withCredentials: true,
  });

export const addListing = (listing: Listing) =>
  axios.post(`${url}/listing/create`, listing, {
    headers,
    withCredentials: true,
  });

export const getAllUserListings = (user: User) =>
  axios.get(`${url}/user/listings/${user?._id}`, {
    headers,
    withCredentials: true,
  });

export const getListing = (listingId: string) =>
  axios.get(`${url}/user/listings/${listingId}`);

export const deleteUserListing = (id: string) =>
  axios.delete(`${url}/listing/delete/${id}`, {
    headers,
    withCredentials: true,
  });

export const updateUserListing = (listing: Listing, id: string) =>
  axios.put(`${url}/listing/update/${id}`, listing, {
    headers,
    withCredentials: true,
  });

export const getSingleListing = (id: string) =>
  axios.get(`${url}/listing/${id}`, {
    headers,
  });
