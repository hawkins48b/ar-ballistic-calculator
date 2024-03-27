import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    darkMode: false
  }),

  getters: {
    isDarkMode () {
      return this.darkMode
    }
  },

  actions: {
    setDarkTheme (value) {
      this.darkMode = value
    }
  },
  persist: true
})
