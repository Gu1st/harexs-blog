import gu1stApi from '../index';

export function list(page) {
  return gu1stApi({
    url: 'http://localhost:7001/article',
    method: 'get',
    params: {
      page
    }
  });
}

export function article(articleData) {
  return gu1stApi.post('http://localhost:7001/article', {
    ...articleData
  });
}

export function del(id) {
  return gu1stApi.delete(`http://localhost:7001/article?id=${id}`);
}

export function info(id) {
  return gu1stApi.get(`http://localhost:7001/article/info?id=${id}`);
}

export function update(articleData) {
  return gu1stApi.put('http://localhost:7001/article', {
    ...articleData
  });
}
