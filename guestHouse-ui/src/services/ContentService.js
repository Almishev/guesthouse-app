import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:8080/api/contents'; 

export const getAllContents = () => axios.get(BASE_REST_API_URL);

export const saveContent = (content) => axios.post(BASE_REST_API_URL, content);

export const getContent = (id) => axios.get(BASE_REST_API_URL + '/' + id);

export const updateContent = (id, content) => axios.put(BASE_REST_API_URL + '/' + id, content);

export const deleteContent = (id) => axios.delete(BASE_REST_API_URL + '/' + id);
