import axios from 'axios';

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
  return axios.get(`/api/v1/timetables/${id}`);
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
  return axios.put(`/api/v1/users/${id}`, { name: req.name, email: req.email });
}

export async function getProfile() {
  return axios.get('/api/v1/users/profile');
}

export async function addTimetable(body) {
  return axios.post('/api/v1/timetables', body);
}

export async function addOrder(body) {
  return axios.post('/api/v1/orders', body);
}

export async function getUserOrders(id) {
  return axios.get(`/api/v1/users/${id}/orders`);
}

export async function getTimetableOrders(id) {
  return axios.get(`/api/v1/orders?timetable_id=${id}`);
}

export async function getAllOrders() {
  return axios.get('/api/v1/orders');
}

export async function getUserMessages(id) {
  return axios.get(`/api/v1/users/${id}/notifications`);
}

export async function updateMessage(body, id) {
  return axios.put(`/api/v1/notifications/${id}`, body);
}

export async function updateOrder(body, id) {
  return axios.put(`/api/v1/orders/${id}`, body);
}
