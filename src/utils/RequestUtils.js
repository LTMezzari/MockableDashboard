import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/ws/'
});

export default api;