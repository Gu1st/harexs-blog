import gu1stApi from '../index';
const IP = import.meta.env.VITE_SERVERIP;

export function list() {
  return gu1stApi.get(`${IP}/comment`);
}

export function enbale(id, status) {
  return gu1stApi.patch(`${IP}/comment/enbale`, {
    id,
    status
  });
}

export function del(id) {
  return gu1stApi.delete(`${IP}/comment?id=${id}`);
}
