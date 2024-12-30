import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    general: {
      darkMode: 'auto'
    }
  }),

  getters: {
  },

  actions: {
    setDarkTheme (value) {
      this.darkMode = value
    }
  },
  persist: true
})
