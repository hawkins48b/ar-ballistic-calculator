import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    trajectories: []
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
