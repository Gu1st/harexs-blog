import gu1stApi from '../index';
const IP = import.meta.env.VITE_SERVERIP;

export function list(page) {
  return gu1stApi({
    url: `${IP}/blog/article`,
    method: 'get',
    params: {
      page
    }
  });
}
