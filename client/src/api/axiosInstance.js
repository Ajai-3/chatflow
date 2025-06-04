import axios from "axios"

const baseURL = import.meta.env.VITE_DB_URL

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

export default axiosInstance
