import axios from 'axios';

export const baseURL = 'http://localhost:3000';

const api = axios.create({
    baseURL: `${baseURL}/ws/`
});

api.interceptors.request.use((config) => {
    const collection = localStorage.collection ?? localStorage.identifier; 
    config.headers = {
        'Collection': collection,
    };
    return config;
})

export default api;