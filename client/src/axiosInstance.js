import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8002/api/v1",
    withCredentials: true
})

export default axiosInstance;