import axios from 'axios';

const comicApi = axios.create({
  baseURL: import.meta.env.VITE_COMIC_API_URL,
});

comicApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { comicApi };
