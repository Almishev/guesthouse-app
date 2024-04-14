import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:8080/api/messages';


export const getAllMessages = () => axios.get(BASE_REST_API_URL)

export const saveMessage = (message) => axios.post(BASE_REST_API_URL, message)

export const getMessage = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const deleteMessage = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const completeMessage = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/complete')

export const inCompleteMessage = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/in-complete')