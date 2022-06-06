import { defineStore } from 'pinia'
import { login } from '../api/bolg/index'
import { useRouter } from 'vue-router'

export const useStore = defineStore('main', {
  state: () => {
    return {
      info: {},
      token: ''
    }
  },
  getters: {},
  actions: {
    async login(user) {
      const router = useRouter()
      const res: any = await login(user)
      if (res.code === 200) {
        this.$state.info = res.token
        this.$state.info = res.data
        router.push({
          path: '/root/dashboard'
        })
      }
    }
  }
})
