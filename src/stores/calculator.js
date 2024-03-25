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
    getProfileId (state) {
      return state.profileId
    },
    getZero (state) {
      return state.zero
    },
    getRange (state) {
      return state.range
    }
  },

  actions: {
    setProfileId (newProfileId) {
      this.profileId = newProfileId
    },
    setZero (newZero) {
      this.zero = newZero
    },
    setRange (newRange) {
      this.range = newRange
    }
  },
  persist: true
})
