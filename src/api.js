import axios from 'axios';
 
const ax = axios.create({
  baseURL: `http://localhost:8080/`,
});

ax.interceptors.response.use(
  function (response){
    return response;
  },
  function (error){

    const { status } = error.response;

    if(status === 403){
      alert('Token inválido. Iniciar sesión nuevamente');
      sessionStorage.removeItem('token');
      sessionStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default ax;