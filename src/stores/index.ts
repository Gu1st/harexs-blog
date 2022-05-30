import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      counter: 0
    }
  },
  getters: {
    doubleCounter: state => state.counter * 2
  },
  actions: {
    addCounter: state => (state += 1)
  }
})
