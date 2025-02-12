import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://eca4-160-19-227-39.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
