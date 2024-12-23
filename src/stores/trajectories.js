import { defineStore } from 'pinia'

export const useTrajectoriesStore = defineStore('trajectories', {
  state: () => ({
    trajectories: []
  }),

  getters: {
    /*
    doubleCount (state) {
      return state.counter * 2
    }
    */
  },

  actions: {
    add (trajectory) {
      let valid = true

      if (trajectory.name === '') {
        valid = false
      }

      if (trajectory.profileId === null) {
        valid = false
      }

      if (valid) {
        this.trajectories.push(trajectory)
      }
      return valid
    },
    remove (index) {
      this.trajectories.splice(index, 1)
    },
    duplicate (index) {
      const trajectory = JSON.parse(JSON.stringify(this.trajectories[index]))
      trajectory.name = 'Copy ' + trajectory.name
      this.trajectories.push(trajectory)
    }
  },
  persist: true
})
