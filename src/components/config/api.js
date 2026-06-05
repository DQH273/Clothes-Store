import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9999",
});

// PRODUCTS
export const getProducts = () => API.get("/products");

export const getProductById = (id) => API.get(`/products/${id}`);

export const addProduct = (data) => API.post("/products", data);

export const updateProduct = (id, data) => API.patch(`/products/${id}`, data);

export const deleteProduct = (id) => API.delete(`/products/${id}`);

// CARTS
export const getCarts = () => API.get("/carts");

export const addCart = (data) => API.post("/carts", data);

export const updateCart = (id, data) => API.patch(`/carts/${id}`, data);

export const removeCart = (id) => API.delete(`/carts/${id}`);

// ORDERS
export const getOrders = () => API.get("/orders");

export const addOrder = (data) => API.post("/orders", data);

// USERS
export const getUsers = () => API.get("/users");

export const addUser = (data) => API.post("/users", data);

export default API;
