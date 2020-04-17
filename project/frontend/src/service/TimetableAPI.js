import axios from 'axios';

export async function login(req) {
  const { data } = await axios.post('/api/v1/users/login', {
    email: req.email,
    password: req.password,
  });
  return data;
}

export async function getAllTimetables() {
  await login({
    email: 'admin@gmail.com',
    password: 'admin',
  });
  const { data } = await axios.get('/api/v1/timetables/');
  return data;
}

export async function logout() {
  await axios.post('/api/v1/users/logout');
  console.log('User is logged out');
}

export async function register(req) {
  const { data } = await axios.post('/api/v1/users/register', {
    name: req.name,
    email: req.email,
    password: req.password,
  });
  return data;
}
