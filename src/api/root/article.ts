import gu1stApi from '../index';

export function list() {
  return gu1stApi.get('http://localhost:7001/article');
}
