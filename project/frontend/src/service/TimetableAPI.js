import axios from 'axios';

export async function login() {
  const { data } = await axios.post('/api/v1/users/login', {
    email: 'admin@gmail.com',
    password: 'admin',
  });
  return data;
}

export async function getAllTimetables() {
  await login();
  const { data } = await axios.get('/api/v1/timetables/');
  return data;
}
