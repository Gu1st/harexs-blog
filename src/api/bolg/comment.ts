import gu1stApi from '../index';
const IP = import.meta.env.VITE_SERVERIP;

export function newComment(params) {
  return gu1stApi.post(`${IP}/comment`, {
    ...params
  });
}

export function commentList(id) {
  return gu1stApi.get(`${IP}/blog/comment?id=${id}`);
}

export function commentChildrenList(id) {
  return gu1stApi.get(`${IP}/comment/children?id=${id}`);
}
