import gu1stApi from '../index';
const IP = import.meta.env.VITE_SERVERIP;

export function home() {
  return gu1stApi.get(`${IP}/home`);
}
