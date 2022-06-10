import gu1stApi from '../index';
const IP = import.meta.env.VITE_SERVERIP;

export function list(page) {
  return gu1stApi({
    url: `${IP}/article`,
    method: 'get',
    params: {
      page
    }
  });
}

export function article(articleData) {
  return gu1stApi.post(`${IP}/article`, {
    ...articleData
  });
}

export function del(id) {
  return gu1stApi.delete(`${IP}/article?id=${id}`);
}

export function info(id) {
  return gu1stApi.get(`${IP}/article/info?id=${id}`);
}

export function update(articleData) {
  return gu1stApi.put(`${IP}/article`, {
    ...articleData
  });
}
