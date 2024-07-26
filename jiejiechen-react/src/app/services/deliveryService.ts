// create an api service using axios and wrap CRUD api calls into methods
import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5198',
    timeout: 1000,
});

export const getPosts = () => api.get('/weatherforecast');

export const getPost = (id: number) => api.get(`/posts/${id}`);



