import axios from 'axios';

const baseURL = `/order`;

export const createOrderAPI = (order, config) => axios.post(`${baseURL}/new`, order, config);
export const getMyOrderAPI = () => axios.get(`${baseURL}/user/orders`);
export const getOrderDetailsAPI = (id) => axios.get(`${baseURL}/getOrder/${id}`);