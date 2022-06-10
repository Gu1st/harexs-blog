import gu1stApi from '../index';

export function home() {
  return gu1stApi.get('http://localhost:7001/home');
}
