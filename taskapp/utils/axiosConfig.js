import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/users', // Cambiado de 3000 a 3001
});

export default instance;
