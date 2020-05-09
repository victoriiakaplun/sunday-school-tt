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
