import axios from "axios";

const baseURL = "http://localhost:8080/api/passengers";

export const getAllPassengers = () => axios.get(baseURL);