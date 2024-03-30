import { defineStore } from 'pinia'

export const useMpbrStore = defineStore('mpbr', {
  state: () => ({
    target: {
      size: 0,
      unit: 'IN'
    }
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    calculate () {
      return null
    }
  }
})
