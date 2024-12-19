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
      measures: {
        type: 'angle', // [angle|distance]
        distance: 0,
        distanceUnit: 'IN', // [IN|CM]
        angle: 0,
        angleUnit: 'MOA' // [MOA|MRAD]
      }
    },
    velocity: 0
  }),

  getters: {
    getZero (state) {
      let distance
      let unit
      if (state.profileId) {
        const ProfilesStore = useProfilesStore()
        const profile = ref(ProfilesStore.profilebyId(state.profileId))

        distance = profile.value.optic.zero
        unit = profile.value.optic.zeroUnit
      }

      return {
        distance,
        unit
      }
    },
    measuresDistanceUnit: (state) => {
      let unit

      if (state.settings.measures.distanceUnit === 'IN') {
        unit = BC.Unit.Inch
      }
      if (state.settings.measures.distanceUnit === 'CM') {
        unit = BC.Unit.Centimeter
      }
      return unit
    },
    measuresAngleUnit: (state) => {
      let unit

      if (state.settings.measures.angleUnit === 'MOA') {
        unit = BC.Unit.MOA
      }
      if (state.settings.measures.angleUnit === 'MRAD') {
        unit = BC.Unit.MRad
      }
      return unit
    },
    rangeDistanceUnit: (state) => {
      let unit

      if (state.settings.range.unit === 'YD') {
        unit = BC.Unit.Yard
      }
      if (state.settings.range.unit === 'M') {
        unit = BC.Unit.Meter
      }
      return unit
    },
    isCalculationValid (state) {
      let isValid = false

      const range = parseFloat(state.settings.range.distance)
      const zero = this.getZero.distance
      const elevation = parseFloat(state.settings.measures.distance)
      const angle = parseFloat(state.settings.measures.angle)

      if (!isNaN(range) && range > 0) {
        if (!isNaN(zero) && zero > 0) {
          if (!isNaN(elevation)) {
            if (!isNaN(angle)) {
              if (range > zero) {
                isValid = true
              }
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
        range: this.settings.range
      }

      const initialShot = ballisticCalculator(params)
      let newShot = initialShot

      if (this.settings.measures.type === 'distance') {
        let initialElevation = initialShot._trajectory[initialShot._trajectory.length - 1].drop.In(this.measuresDistanceUnit)
        initialElevation = Math.round(initialElevation * 10) / 10

        let velocityStep = 100
        let currentVelocity = parseFloat(profile.value.measures.velocity)
        const elevationGoal = Math.round(parseFloat(this.settings.measures.distance) * 10) / 10

        let newElevation = initialElevation
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

          // get new elevation
          if (newShot._trajectory.length > 0) {
            newElevation = newShot._trajectory[newShot._trajectory.length - 1].drop.In(this.measuresDistanceUnit)
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
      }

      if (this.settings.measures.type === 'angle') {
        let initialDropAdjustment = initialShot._trajectory[initialShot._trajectory.length - 1].dropAdjustment.In(this.measuresAngleUnit)
        initialDropAdjustment = Math.round(initialDropAdjustment * 10) / 10

        let velocityStep = 100
        let currentVelocity = parseFloat(profile.value.measures.velocity)
        const dropAdjustmentGoal = Math.round(parseFloat(this.settings.measures.angle) * 10) / 10

        let newDropAdjustment = initialDropAdjustment
        params.measures.velocity = currentVelocity

        while (newDropAdjustment !== dropAdjustmentGoal && velocityStep >= 1 && currentVelocity < 10000) {
          let addVelocity // note if we added velocity or not
          if (newDropAdjustment > dropAdjustmentGoal) {
            currentVelocity -= velocityStep
            addVelocity = false
          }
          if (newDropAdjustment < dropAdjustmentGoal) {
            currentVelocity += velocityStep
            addVelocity = true
          }

          // set new velocity
          params.measures.velocity = currentVelocity

          // fire new shot
          newShot = ballisticCalculator(params)

          // get new elevation
          if (newShot._trajectory.length > 0) {
            newDropAdjustment = newShot._trajectory[newShot._trajectory.length - 1].dropAdjustment.In(this.measuresAngleUnit)
            newDropAdjustment = Math.round(newDropAdjustment * 10) / 10

            // devide velocity step by two if we exceeded the elevation goal
            if (addVelocity && newDropAdjustment > dropAdjustmentGoal) {
              velocityStep = velocityStep / 2
            }
            if (!addVelocity && newDropAdjustment < dropAdjustmentGoal) {
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
