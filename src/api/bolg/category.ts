import gu1stApi from '../index';
const IP = import.meta.env.VITE_SERVERIP;

export function articleAndClassify(cid, page) {
  return gu1stApi({
    url: `${IP}/article/classify`,
    method: 'get',
    params: {
      cid,
      page
    }
  });
}
export function classifyToBlog() {
  return gu1stApi({
    url: `${IP}/classifyToBlog`,
    method: 'get'
  });
}
