import gu1stApi from '../index';
const IP = import.meta.env.VITE_SERVERIP;

export function articleAndSearch(page, content) {
  return gu1stApi({
    url: `${IP}/article/search`,
    method: 'get',
    params: {
      page,
      content
    }
  });
}
