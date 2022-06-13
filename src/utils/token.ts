export function getToken() {
  return window.localStorage.getItem('gu1st_auth');
}

export function setToken(auth) {
  window.localStorage.setItem('gu1st_auth', auth);
}

export function removeToken(key) {
  window.localStorage.removeItem(key);
}
