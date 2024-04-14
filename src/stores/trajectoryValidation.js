import { defineStore } from 'pinia'
import { ref } from 'vue'
import ballisticCalculator from 'src/controller/ballistic-calculator'
// import { useProfilesStore } from './profiles'
import * as BC from 'js-ballistics'
import { useProfilesStore } from './profiles'

export const useTrajectoryValidationStore = defineStore('trajectoryValidation', {

  state: () => ({
    profileId: null,
    settings: {
      range: {
        distance: 100,
        unit: 'YD',
        step: 1
      },
      zero: {
        distance: 25,
        unit: 'YD'
      },
      measures: {
        elevation: 0,
        unit: 'IN'
      }
    },
    velocity: 0
  }),

  getters: {
    elevationUnit: (state) => {
      let unit

      if (state.settings.measures.unit === 'IN') {
        unit = BC.Unit.Inch
      }
      if (state.settings.measures.unit === 'CM') {
        unit = BC.Unit.Centimeter
      }
      return unit
    },
    distanceUnit: (state) => {
      let unit

      if (state.settings.range.unit === 'YD') {
        unit = BC.Unit.Yard
      }
      if (state.settings.range.unit === 'M') {
        unit = BC.Unit.Meter
      }
      return unit
    }
  },

  actions: {
    calculatTrajectoryValidation () {
      const ProfilesStore = useProfilesStore()
      const profile = ref(ProfilesStore.profilebyId(this.profileId))

      const params = {
        weapon: profile.value.weapon,
        optic: profile.value.optic,
        bullet: profile.value.bullet,
        measures: { ...profile.value.measures },
        options: profile.value.options,
        range: this.settings.range,
        zero: this.settings.zero
      }

      const initialShot = ballisticCalculator(params)
      const initialElevation = initialShot._trajectory[initialShot._trajectory.length - 1].drop

      let velocityStep = 1000
      let currentVelocity = parseFloat(params.measures.velocity)
      const elevationGoal = Math.round(parseFloat(this.settings.measures.elevation) * 10) / 10

      let newElevation = Math.round(initialElevation.In(this.elevationUnit) * 10) / 10
      let newShot = initialShot
      while (newElevation !== elevationGoal && velocityStep >= 1) {
        let addedVelocity // note if we added velocity or not
        if (newElevation > elevationGoal) {
          currentVelocity -= velocityStep
          addedVelocity = false
        }
        if (newElevation < elevationGoal) {
          currentVelocity += velocityStep
          addedVelocity = true
        }

        // set new velocity
        params.measures.velocity = currentVelocity

        // fire new shot
        newShot = ballisticCalculator(params)
        // get new elevation
        if (newShot._trajectory.length > 0) {
          newElevation = newShot._trajectory[newShot._trajectory.length - 1].drop.In(this.elevationUnit)

          newElevation = Math.round(newElevation * 10) / 10

          // devide velocity step by two if we exceeded the elevation goal
          if (addedVelocity && newElevation > elevationGoal) {
            velocityStep = velocityStep / 2
          }
          if (!addedVelocity && newElevation < elevationGoal) {
            velocityStep = velocityStep / 2
          }
        } else { // error, can't make this shot
          velocityStep = 0 // exit loop
        }
      }

      return {
        initialShot,
        validationShot: newShot,
        velocity: params.measures.velocity
      }
    }
  },
  persist: true
})
