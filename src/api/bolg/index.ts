import gu1stApi from '../index'

export function login(user) {
  const { username, password } = user
  return gu1stApi.post('http://localhost:7001/login', {
    username,
    password
  })
}
