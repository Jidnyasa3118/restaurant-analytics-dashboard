import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getRestaurants = (params) =>
  API.get("/restaurants", { params });

export const getAnalytics = (params) =>
  API.get("/analytics", { params });

export const getTopRestaurants = (params) =>
  API.get("/top-restaurants", { params });
