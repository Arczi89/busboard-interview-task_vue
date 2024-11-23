import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  async getStops() {
    return apiClient.get('/stops').then((response) => response.data);
  },
};
