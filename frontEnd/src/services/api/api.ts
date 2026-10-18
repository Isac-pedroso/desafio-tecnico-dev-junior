import axios from "axios";

const URL_API = import.meta.env.VITE_URL_BACKEND;
console.log(URL_API)
const api = axios.create({
    baseURL: URL_API
});


api.interceptors.response.use(
    response => response,
    error => {
        console.log(error)
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.log("Error de permissão de rota.");
        }

        return Promise.reject(error);
    }
)

export default api;