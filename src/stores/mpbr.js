import { defineStore } from 'pinia'
import { reactive } from 'vue'
import ballisticCalculator from 'src/controller/ballistic-calculator'
import { useProfilesStore } from './profiles'
import * as BC from 'js-ballistics'

export const useMpbrStore = defineStore('mpbr', {

  state: () => ({
    profileId: null,
    target: {
      size: 17.7,
      unit: 'IN'
    }
  }),

  getters: {
    distanceUnit: (state) => {
      let unit

      if (state.target.unit === 'IN') {
        unit = 'YD'
      }
      if (state.target.unit === 'CM') {
        unit = 'M'
      }
      return unit
    }
  },

  actions: {
    async calculateTrajectoriesFrom1to200Y (profileId) {
      // perform calculation
      const range = {
        distance: 800,
        unit: 'YD',
        step: 1
      }
      const zero = {
        distance: 1,
        unit: 'YD'
      }

      const ProfilesStore = useProfilesStore()
      const profile = reactive(ProfilesStore.profilebyId(this.profileId))

      const promises = []
      // loop from 5unit to 200unit
      for (let i = 1; i <= 200; i++) {
        const calculation = new Promise((resolve) => {
          // update zero
          zero.distance = i

          const params = {
            optic: profile.optic,
            bullet: profile.bullet,
            range,
            zero
          }
          const shot = ballisticCalculator(params, true)

          resolve(shot)
        })
        promises.push(calculation)
      }
      return Promise.all(promises)
    },
    findLongestTrajectoryForTargetSize (shots, targetSize, targetSizeUnit, distanceUnit) {
      let longestShotDistance = 0
      let longestShot
      shots.forEach((shot) => {
        if (shot.maxOrdinance.elevation.In(targetSizeUnit) <= targetSize / 2) {
          // find first distance where drop >= -target size / 2
          let longestTrajectoryFound = false
          let longestTrajectoryDistance
          shot._trajectory.forEach((trajectory) => {
            if (trajectory.distance.In(distanceUnit) >= 5) { // reject first 5unit distance (avoiding t=0 already outside targetsize/2)
              if (!longestTrajectoryFound) {
                const drop = trajectory.drop.In(targetSizeUnit)
                if (drop <= -targetSize / 2) {
                  longestTrajectoryFound = true
                  longestTrajectoryDistance = trajectory.distance.In(distanceUnit)
                }
              }
            }
          })
          shot.distanceMax = longestTrajectoryDistance - 1
          if (shot.distanceMax > longestShotDistance) {
            longestShotDistance = shot.distanceMax
            longestShot = shot
          }
        }
      })
      return longestShot
    },
    async calculateMpbr () {
      let targetSize
      let targetSizeUnit
      let distanceUnit
      if (this.target.unit === 'IN') {
        targetSizeUnit = BC.Unit.Inch
        distanceUnit = BC.Unit.Yard
        targetSize = BC.UNew.Inch(parseFloat(this.target.size)).In(targetSizeUnit)
      }
      if (this.target.unit === 'CM') {
        targetSizeUnit = BC.Unit.Centimeter
        distanceUnit = BC.Unit.Meter
        targetSize = BC.UNew.Centimeter(parseFloat(this.target.size)).In(targetSizeUnit)
      }

      let mpbr = null
      if (this.profileId && this.target.size) {
        const shots = await this.calculateTrajectoriesFrom1to200Y(this.profileId)

        const filteredShots = await this.calculateMaxElevation(shots, targetSizeUnit, distanceUnit)

        mpbr = this.findLongestTrajectoryForTargetSize(filteredShots, targetSize, targetSizeUnit, distanceUnit)
      }
      // save the results as shot
      return mpbr
    }
  },
  persist: true
})
