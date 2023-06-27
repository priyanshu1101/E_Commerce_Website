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
export const loadUserApi = () => axios.get(`${baseURL}/profile`);

//Forgot Password 
export const forgotPasswordAPI = (userData) => axios.post(`${baseURL}/password/forgot`, userData);

// Reset Password
export const resetPasswordAPI = (userData) => axios.put(`${baseURL}/password/reset/${userData.token}`, userData);


// Update profile
export const updateUserProfileApi = (userData) => axios.put(`${baseURL}/profile/update`, userData);

// Update password 
export const updatePasswordApi = (passwords) => axios.put(`${baseURL}/password/update`, passwords);



// export const fetchProductDetails = (productID) => axios.get(`${baseURL}/${productID}`);
