import axios from 'axios';

const ax = axios.create({
  baseURL: `http://localhost:8080/`,
});

// Inicializar token en base.interceptors.request
ax.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Manejar los errores de las solicitudes de forma global
ax.interceptors.response.use(
  function (response){
    return response;
  },
  function (error){

    const { status } = error.response;

    if(status === 403){
      sessionStorage.removeItem('token');
      sessionStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default ax;