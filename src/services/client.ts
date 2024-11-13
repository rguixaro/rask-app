import axios from 'axios';

export const Client = () => axios.create({ withCredentials: true });

export const API = 'http://127.0.0.1:8000/api';
