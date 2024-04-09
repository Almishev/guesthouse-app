import axios from "axios";

const BASE_REST_API_URL = 'http://localhost:8080/api/reservations';


export const getAllReservations = () => axios.get(BASE_REST_API_URL)

export const saveReservation = (reservation) => axios.post(BASE_REST_API_URL, reservation)

export const getReservation = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateReservation = (id, reservation) => axios.put(BASE_REST_API_URL + '/' + id, reservation)

export const deleteReservation = (id) => axios.delete(BASE_REST_API_URL + '/' + id)


  export const getAvailableDays = (startDate, endDate) => {
    return axios.get(`${BASE_REST_API_URL}/available-days?startDate=${startDate}&endDate=${endDate}`);
};  