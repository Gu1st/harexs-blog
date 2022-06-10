import gu1stApi from '../index';

export function list() {
  return gu1stApi.get('http://localhost:7001/comment');
}

export function enbale(id, status) {
  return gu1stApi.patch('http://localhost:7001/comment/enbale', {
    id,
    status
  });
}

export function del(id) {
  return gu1stApi.delete(`http://localhost:7001/comment?id=${id}`);
}
