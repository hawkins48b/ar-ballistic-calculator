import { defineStore } from 'pinia'

export const useCalculatorStore = defineStore('calculator', {
  state: () => ({
    profileId: null,
    zero: {
      distance: 25,
      unit: 'YD'
    },
    range: {
      distance: 500,
      unit: 'YD',
      step: 25
    }
  }),

  getters: {
  },
  actions: {
  },
  persist: true
})
