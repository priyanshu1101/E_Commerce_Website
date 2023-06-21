import axios from 'axios';

const baseURL = `/product`;

export const fetchProducts = (keyword,currentPage) => axios.get(`${baseURL}?keyword=${keyword}&page=${currentPage}`);
export const fetchProductDetails = (productID) => axios.get(`${baseURL}/${productID}`);
// export const createPost = (newPost) => axios.post(url,newPost);
// export const updatePost = (id,newPost) => axios.patch(`${url}/${id}`,newPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`)

//To fetch data from the above urls