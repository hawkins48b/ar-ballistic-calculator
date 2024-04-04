import { defineStore } from 'pinia'
import { reactive } from 'vue'
import ballisticCalculator from 'src/controller/ballistic-calculator'
import { useProfilesStore } from './profiles'
import * as BC from 'js-ballistics'

export const useMpbrStore = defineStore('mpbr', {

  state: () => ({
    profileId: null,
    target: {
      size: 8,
      unit: 'IN'
    }
  }),

  getters: {
    elevationUnit: (state) => {
      let unit

      if (state.target.unit === 'IN') {
        unit = BC.Unit.Inch
      }
      if (state.target.unit === 'CM') {
        unit = BC.Unit.Centimeter
      }
      return unit
    },
    distanceUnit: (state) => {
      let unit

      if (state.target.unit === 'IN') {
        unit = BC.Unit.Yard
      }
      if (state.target.unit === 'CM') {
        unit = BC.Unit.Meter
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
    findLongestTrajectoryForTargetSize (shots, targetSize) {
      let longestShot
      let longestShotDistanceMaxMM = 0

      shots.forEach((shot) => {
        if (shot.maxOrdinance.elevation.In(BC.Unit.Millimeter) <= targetSize.In(BC.Unit.Millimeter) / 2) {
          shot.mpbr = {
            distanceMin: BC.UNew.Millimeter(0),
            elevationMin: BC.UNew.Millimeter(0),
            distanceMax: BC.UNew.Millimeter(0),
            elevationMax: BC.UNew.Millimeter(0)
          }
          shot._trajectory.forEach((trajectory) => {
            if (trajectory.distance.In(BC.Unit.Millimeter) < shot.maxOrdinance.distance.In(BC.Unit.Millimeter)) {
              if (trajectory.drop.In(BC.Unit.Millimeter) < -targetSize.In(BC.Unit.Millimeter) / 2) {
                shot.mpbr.distanceMin = trajectory.distance
                shot.mpbr.elevationMin = trajectory.drop
              }
            }

            if (trajectory.distance.In(BC.Unit.Millimeter) > shot.maxOrdinance.distance.In(BC.Unit.Millimeter)) {
              if (trajectory.drop.In(BC.Unit.Millimeter) > -targetSize.In(BC.Unit.Millimeter) / 2) {
                shot.mpbr.distanceMax = trajectory.distance
                shot.mpbr.elevationMax = trajectory.drop
              }
            }
          })

          // keep the shot that has maximum distance for mpbr
          if (shot.mpbr.distanceMax.In(BC.Unit.Millimeter) > longestShotDistanceMaxMM) {
            longestShotDistanceMaxMM = shot.mpbr.distanceMax.In(BC.Unit.Millimeter)
            longestShot = shot
          }
        }
      })
      return longestShot
    },
    async calculateMpbr () {
      let targetSize
      if (this.target.unit === 'IN') {
        targetSize = BC.UNew.Inch(parseFloat(this.target.size))
      }
      if (this.target.unit === 'CM') {
        targetSize = BC.UNew.Centimeter(parseFloat(this.target.size))
      }

      let mpbr = null
      if (this.profileId && this.target.size) {
        const shots = await this.calculateTrajectoriesFrom1to200Y(this.profileId)

        mpbr = this.findLongestTrajectoryForTargetSize(shots, targetSize)
      }
      // save the results as shot
      return mpbr
    }
  },
  persist: true
})
