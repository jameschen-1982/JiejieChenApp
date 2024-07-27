// create an api service using axios and wrap CRUD api calls into methods
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5198',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});

export const getTable = () => api.get('/weatherforecast');

export const postForm = (form: FormData) => {
  return api.post(`/api/enquiryform`, form);
};
