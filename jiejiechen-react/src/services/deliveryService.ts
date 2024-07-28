// create an api service using axios and wrap CRUD api calls into methods
import axios from 'axios';
import {User} from "oidc-client-ts";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  timeout: 30000,
  headers: {'Content-Type': 'application/json'}
});

const getUser = () => {
  const oidcStorage = window.localStorage.getItem(`oidc.user:${process.env.NEXT_PUBLIC_IDP_AUTHORITY}:${process.env.NEXT_PUBLIC_IDP_CLIENT_ID}`);
  if (!oidcStorage) {
    return null;
  }
  
  return User.fromStorageString(oidcStorage);
}

export const getTable = () => api.get('/weatherforecast');

export const postForm = (form: FormData) => {
  return api.post(`/api/enquiryform`, form);
};

export const queryForms = () => {
  const user = getUser();
  const token = user?.access_token;
  return api.get(`/api/enquiryform`, {headers: {Authorization: `Bearer ${token}`}});
}
