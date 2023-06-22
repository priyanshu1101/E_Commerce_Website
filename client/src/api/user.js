import axios from 'axios';

const baseURL = `/user`;

export const loginUser = (userData, config) => axios.post(`${baseURL}/login`, userData, config);
export const googleAuthUser = (userData, config) => axios.post(`${baseURL}/googleAuth`, userData, config);
export const registerUser = (userData, config) => axios.post(`${baseURL}/register`, userData, config);
export const forgotPassword = (userData) => axios.post(`${baseURL}/password/forgot`, userData);

// export const fetchProductDetails = (productID) => axios.get(`${baseURL}/${productID}`);
