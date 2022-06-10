import gu1stApi from '../index';
const IP = import.meta.env.VITE_SERVERIP;

export function list() {
  return gu1stApi.get(`${IP}/classify`);
}

export function add(className) {
  return gu1stApi.post(`${IP}/classify`, {
    className
  });
}

export function del(id) {
  return gu1stApi.delete(`${IP}/classify?id=${id}`);
}

export function modify(id, className) {
  return gu1stApi.put(`${IP}/classify`, {
    id,
    className
  });
}
