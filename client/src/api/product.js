import axios from 'axios';

const baseURL = `/products`;

export const fetchProducts = () => axios.get(baseURL);

// export const createPost = (newPost) => axios.post(url,newPost);
// export const updatePost = (id,newPost) => axios.patch(`${url}/${id}`,newPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`)

//To fetch data from the above urls