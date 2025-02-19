import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://ec59-103-228-242-54.ngrok-free.app/api',
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
