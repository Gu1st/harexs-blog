export function getToken() {
  return window.sessionStorage.getItem('gu1st_auth')
}

export function setToken(auth) {
  window.sessionStorage.setItem('gu1st_auth', auth)
}

export function removeToken(key) {
  window.sessionStorage.removeItem(key)
}
