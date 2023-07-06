import axios from 'axios';

const baseURL = `/product`;

export const fetchProducts = (parameters) => axios.get(`${baseURL}?${parameters}`);
export const fetchProductDetails = (productID) => axios.get(`${baseURL}/${productID}`);
export const reviewProductAPI = (reviewData, config) => axios.put(`${baseURL}/review`, reviewData, config);


// Admin

export const fetchProductsForAdminAPI = () => axios.get(`${baseURL}/admin`);
export const createProductByAdminAPI = (productData, config) => axios.post(`${baseURL}/admin/new`, productData, config);
export const deleteProductByAdminAPI = (productID) => axios.delete(`${baseURL}/admin/${productID}`);
export const updateProductByAdminAPI = (productID, productData, config) => axios.put(`${baseURL}/admin/${productID}`, productData, config);
