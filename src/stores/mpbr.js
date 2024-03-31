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

  },

  actions: {
    calculateMpbr () {
      let mpbr = null
      if (this.profileId && this.target.size) {
        // perform calculation
        const range = {
          distance: 500,
          unit: 'YD',
          step: 1
        }
        const zero = {
          distance: 1,
          unit: 'YD'
        }

        const ProfilesStore = useProfilesStore()
        const profile = reactive(ProfilesStore.profilebyId(this.profileId))

        let elevationMaxIN
        if (this.target.unit === 'IN') {
          elevationMaxIN = parseFloat(this.target.size)
        }
        if (this.target.unit === 'CM') {
          elevationMaxIN = BC.UNew.Centimeter(parseFloat(this.target.size)).In(BC.Unit.Inch)
        }
        elevationMaxIN = elevationMaxIN / 2 // half of target size

        const promisesCalculations = []
        // loop from 1y to 200y
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
            const shot = ballisticCalculator(params)

            resolve(shot)
          })
          promisesCalculations.push(calculation)
        }

        // process all results
        Promise.all(promisesCalculations).then((shots) => {
          // 1: keep the shots which don't go higher than target size / 2
          const shotsElevationChecked = []
          shots.forEach((shot) => {
            // loop each trajectory and verify max elevation
            const shotElevations = shot._trajectory.map(trajectory => trajectory.drop.In(BC.Unit.Inch))
            const shotElevationMax = Math.max(...shotElevations)

            if (shotElevationMax <= elevationMaxIN) {
              shotsElevationChecked.push(shot)
            }
          })
          // 2: keep the shot that the longest distance for target size/2

          let distanceMaxYD = 0
          shotsElevationChecked.forEach((shot) => {
            const ElevationMinIN = -elevationMaxIN

            let shotDistanceMaxFound = false
            shot._trajectory.forEach((trajectory) => {
              let shotDistanceMaxYD
              if (!shotDistanceMaxFound) {
                if (trajectory.drop.In(BC.Unit.Inch) <= ElevationMinIN) {
                  shotDistanceMaxYD = trajectory.distance.In(BC.Unit.Yard)
                  shotDistanceMaxFound = true

                  if (shotDistanceMaxYD > distanceMaxYD) {
                    distanceMaxYD = shotDistanceMaxYD
                    mpbr = shot
                  }
                }
              }
            })
          })
          console.log('distanceMaxYD', distanceMaxYD)
          console.log('zeroDistanceYD', mpbr.weapon.zeroDistance.In(BC.Unit.Yard))
          console.log('mpbr', mpbr)
        })
      }
      return mpbr
    }
  },
  persist: true
})
