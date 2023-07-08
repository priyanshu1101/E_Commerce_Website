import axios from 'axios';

const baseURL = `/order`;

export const createOrderAPI = (order, config) => axios.post(`${baseURL}/new`, order, config);
export const getMyOrderAPI = () => axios.get(`${baseURL}/user/orders`);
export const getOrderDetailsAPI = (id) => axios.get(`${baseURL}/getOrder/${id}`);

// Admin
export const fetchAllOrdersForAdminAPI = () => axios.get(`${baseURL}/admin/orders`);
export const updateOrderAPI = (orderId, orderData, config) => axios.put(`${baseURL}/admin/order/${orderId}`, orderData, config);
export const deleteOrderAPI = (orderId) => axios.delete(`${baseURL}/admin/order/${orderId}`);
