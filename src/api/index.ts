import axios from 'axios'
import { getToken } from '../utils/token'
const service = axios.create({
  baseURL: '',
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    (config.headers as any).Authorization = getToken() || ''
    return config
  },
  error => {
    console.log(error)
    return Promise.reject()
  }
)

service.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 200:
        if (response.data.msg) {
          window.$message.success(response.data.msg)
        }
        break
      case 500:
        window.$message.error(response.data.msg || response.data.data)
        break
      case 408:
      case 403:
      case 401:
        window.$message.error('当前身份会话已过期，请重新登录')
        break
    }
    return response.data
  },
  error => {
    return error.response.data || Promise.reject()
  }
)

export default service
