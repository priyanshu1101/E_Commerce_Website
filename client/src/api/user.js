import axios from 'axios';

const baseURL = `/user`;

// Register
export const registerUser = (userData, config) => axios.post(`${baseURL}/register`, userData, config);

// Login
export const loginUser = (userData, config) => axios.post(`${baseURL}/login`, userData, config);
export const googleAuthUser = (userData, config) => axios.post(`${baseURL}/googleAuth`, userData, config);

//Logout 
export const logoutUser = () => axios.get(`${baseURL}/logout`);

// Load User
export const loadUserApi = (config) => axios.get(`${baseURL}/profile`, config);

//Forgot Password 
export const forgotPasswordAPI = (userData) => axios.post(`${baseURL}/password/forgot`, userData);

// Reset Password
export const resetPasswordAPI = (userData) => axios.put(`${baseURL}/password/reset/${userData.token}`, userData);


// Update profile
export const updateUserProfileApi = (userData) => axios.put(`${baseURL}/profile/update`, userData);

// Update password 
export const updatePasswordApi = (passwords) => axios.put(`${baseURL}/password/update`, passwords);


// Admin

// Fetch user for admin
export const fetchUsersAPI = () => axios.get(`${baseURL}/admin/users`);
export const fetchUserDetailsAPI = (userId) => axios.get(`${baseURL}/admin/user/${userId}`);
export const updateUserAPI = (userId, userData, config) => axios.put(`${baseURL}/admin/user/${userId}`, userData, config);
export const deleteUserAPI = (userId) => axios.delete(`${baseURL}/admin/user/${userId}`);




// export const fetchProductDetails = (productID) => axios.get(`${baseURL}/${productID}`);
