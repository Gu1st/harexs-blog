import axios from 'axios'
import { useMessage } from 'naive-ui'
const message = useMessage()

const service = axios.create({
  baseURL: '',
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    // config.headers.Token = sessionStorage.getItem('token')!
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
      case 500:
        message.error('数据请求出错，请重试')
        break
      case 408:
        message.info('当前用户身份已过期,请重新登录')
        break
    }
    return response.data
  },
  error => {
    console.log(error)
    return Promise.reject()
  }
)

export default service
