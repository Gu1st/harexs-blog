import { defineStore } from 'pinia';
import { login, verify } from '../api/bolg/index';
import { setToken } from '../utils/token';

interface articleClassifyFace {
  id: string | number;
  class_name: string;
  createdAt?: string;
  updated_at?: string;
  created_at?: string;
  updatedAt?: string;
}

export const useStore = defineStore('main', {
  state: () => {
    return {
      info: {} //存储用户信息
    };
  },

  actions: {
    //登录接口
    async login(user) {
      const res: any = await login(user);
      if (res.code === 200) {
        this.$state.info = res.data;
        setToken(res.token);
        return true;
      }
      return false;
    },
    //验证token
    async verify(token) {
      const res: any = await verify(token);
      if (res.code === 200) {
        return true;
      }
      return false;
    }
  }
});
