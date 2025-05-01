import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt"); // 또는 Zustand에서 가져와도 OK
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
