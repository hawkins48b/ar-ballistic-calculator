import { defineStore } from 'pinia'
import ballisticCalculator from 'src/controller/ballistic-calculator'
import { useProfilesStore } from './profiles'
import { ref } from 'vue'

export const useTrajectoriesStore = defineStore('trajectories', {
  state: () => ({
    trajectories: [],
    range: {
      distance: 300,
      unit: 'YD',
      step: 25
    }
  }),

  getters: {
    /*
    doubleCount (state) {
      return state.counter * 2
    }
    */
    isCalculationValid: (state) => {
      let isValid = false

      const distance = parseFloat(state.range.distance)

      if (distance <= 3000) {
        isValid = true
      }

      return isValid
    },
    getTrajectories: (state) => {
      return state.trajectories.filter((trajectory) => {
        const ProfilesStore = useProfilesStore()
        const profile = ProfilesStore.profilebyId(trajectory.profileId)
        return profile !== undefined
      })
    }
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
    },
    calculateShot (index, step) {
      let results = null
      const trajectory = this.trajectories[index]
      if (trajectory) {
        if (trajectory.profileId) {
          const ProfilesStore = useProfilesStore()
          const profile = ref(ProfilesStore.profilebyId(trajectory.profileId))

          if (profile.value) {
            const params = {
              weapon: profile.value.weapon,
              optic: profile.value.optic,
              bullet: profile.value.bullet,
              measures: profile.value.measures,
              options: profile.value.options,
              range: {
                distance: this.range.distance,
                unit: this.range.unit,
                step
              },
              atmosphere: trajectory.atmosphere
            }

            if (this.isCalculationValid) {
              results = ballisticCalculator(params)
            }
          }
        }
      }

      return results
    }

  },
  persist: true
})
