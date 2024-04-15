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
    },
    isCalculationValid: (state) => {
      let isValid = false

      const range = parseFloat(state.settings.range.distance)
      const zero = parseFloat(state.settings.zero.distance)
      const elevation = parseFloat(state.settings.measures.elevation)

      if (!isNaN(range) && range > 0) {
        if (!isNaN(zero) && zero > 0) {
          if (!isNaN(elevation)) {
            if (range > zero) {
              isValid = true
            }
          }
        }
      }

      return isValid
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
      let initialElevation = initialShot._trajectory[initialShot._trajectory.length - 1].drop.In(this.elevationUnit)
      initialElevation = Math.round(initialElevation * 10) / 10

      let velocityStep = 100
      let currentVelocity = parseFloat(profile.value.measures.velocity)
      const elevationGoal = Math.round(parseFloat(this.settings.measures.elevation) * 10) / 10

      let newElevation = initialElevation
      let newShot = initialShot
      params.measures.velocity = currentVelocity

      while (newElevation !== elevationGoal && velocityStep >= 1 && currentVelocity < 10000) {
        let addVelocity // note if we added velocity or not
        if (newElevation > elevationGoal) {
          currentVelocity -= velocityStep
          addVelocity = false
        }
        if (newElevation < elevationGoal) {
          currentVelocity += velocityStep
          addVelocity = true
        }

        // set new velocity
        params.measures.velocity = currentVelocity

        // fire new shot
        newShot = ballisticCalculator(params)
        console.log('new shot')
        // get new elevation
        if (newShot._trajectory.length > 0) {
          newElevation = newShot._trajectory[newShot._trajectory.length - 1].drop.In(this.elevationUnit)
          newElevation = Math.round(newElevation * 10) / 10

          // devide velocity step by two if we exceeded the elevation goal
          if (addVelocity && newElevation > elevationGoal) {
            velocityStep = velocityStep / 2
          }
          if (!addVelocity && newElevation < elevationGoal) {
            velocityStep = velocityStep / 2
          }
        } else { // error, can't make this shot
          velocityStep = 0 // exit loop
        }
      }

      // if maximum is reach, set velocity to 0
      if (params.measures.velocity >= 10000) {
        params.measures.velocity = 0
        newShot = null
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
