import request from '../index'

interface getParams {
  url: string
  params: any
}

const test = (query: getParams) => {
  const { url, params } = query
  return request.get(url, params)
}

export { test }
