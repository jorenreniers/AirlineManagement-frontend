import axios from "axios";

const baseURL = "http://localhost:8080/api/planes";

export const getAllPlanes = () => axios.get(baseURL);