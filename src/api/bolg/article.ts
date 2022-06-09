import gu1stApi from '../index';
const IP = import.meta.env.VITE_SERVERIP;

export function info(id) {
  return gu1stApi({
    url: `${IP}/article/info`,
    method: 'get',
    params: {
      id
    }
  });
}
