import gu1stApi from '../index';

export function list() {
  return gu1stApi.get('http://localhost:7001/article');
}

export function article(articleData) {
  return gu1stApi.post('http://localhost:7001/article', {
    ...articleData
  });
}
