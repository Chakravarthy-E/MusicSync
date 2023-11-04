import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.1.100:8989',
});

export default client;
