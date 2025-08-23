import axios from "axios";

const baseURL = "http://localhost:8080/api/passengers";

export const getAllPassengers = () => axios.get(baseURL);

export const getPassengerById = (id) => axios.get(`${baseURL}/${id}`);
export const deletePassengerById = (id) => axios.delete(`${baseURL}/${id}`);
export const createPassenger = (passenger) => axios.post(baseURL, passenger);