import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080', // Ajuste para a porta que o Quarkus está usando
});