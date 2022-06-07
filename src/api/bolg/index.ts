import gu1stApi from '../index';
const IP = import.meta.env.VITE_SERVERIP;

export function login(user) {
  const { username, password } = user;
  return gu1stApi.post(`${IP}/login`, {
    username,
    password
  });
}

//验证token有效性
export function verify(token) {
  return gu1stApi.post(`${IP}/verify`, {
    token
  });
}
