import axios from 'axios';

const axiosInstance = axios({ baseURL: '/api/v1' });

export async function loginUser(req) {
  return axios.post('/api/v1/users/login', {
    email: req.email,
    password: req.password,
  });
}

export function getAllTimetables() {
  return axios.get('/api/v1/timetables/');
}

export function getTimetable(id) {
  return axios.post(`/api/v1/timetables/${id}`);
}

export async function logoutUser() {
  return axios.post('/api/v1/users/logout');
}

export async function registerUser(req) {
  return axios.post('/api/v1/users/register', {
    name: req.name,
    email: req.email,
    password: req.password,
  });
}

export async function update(req, id) {
  return axios.put(`api/v1/users/${id}`, { name: req.name, email: req.email });
}

export async function getProfile() {
  return axios.get('api/v1/users/profile');
}

export async function addTimetable(req) {
  return axios.post('/api/v1/timetables', req);
}

export async function addOrder(req) {
  return axios.post('/api/v1/orders', req);
}

export async function getUserOrders(id) {
  return axios.get(`/api/v1/users/${id}/orders`);
}

export async function getTimetableOrders(id) {
  return axios.get(`/api/v1/orders?timetable_id=${id}`);
}
