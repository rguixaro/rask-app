import axios from 'axios';

export const Client = () => axios.create({ withCredentials: true });

export const API = 'https://api.rask.rguixaro.dev/api';
