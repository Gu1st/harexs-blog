import gu1stApi from '../index'

export function list() {
  return gu1stApi.get('http://localhost:7001/classify')
}

export function add(className) {
  return gu1stApi.post('http://localhost:7001/classify', {
    className
  })
}

export function del(id) {
  return gu1stApi.delete(`http://localhost:7001/classify?id=${id}`)
}

export function modify(id, className) {
  return gu1stApi.put(`http://localhost:7001/classify`, {
    id,
    className
  })
}
