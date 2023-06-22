import axios from 'axios';

const baseURL = `/product`;

export const fetchProducts = (parameters) => axios.get(`${baseURL}?${parameters}`);
export const fetchProductDetails = (productID) => axios.get(`${baseURL}/${productID}`);