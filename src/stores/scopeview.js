import { defineStore } from 'pinia'
import ballisticCalculator from 'src/controller/ballistic-calculator'
import { useProfilesStore } from './profiles'
import { ref } from 'vue'
import * as BC from 'js-ballistics'

// International Standard Atmosphere ISA
const ISA_ALTITUDE = 0
const ISA_ALTITUDE_UNIT = 'FT'
const ISA_PRESSURE = 29.92
const ISA_PRESSURE_UNIT = 'IN/HG'
const ISA_TEMPERATURE = 59
const ISA_TEMPERATURE_UNIT = '°F'
const ISA_HUMIDITY = 78

export const useScopeViewStore = defineStore('scopeView', {
  state: () => ({
    profileId: null,
    range: {
      distance: 500,
      unit: 'YD',
      step: 500
    },
    elevation: {
      angle: 0,
      unit: 'DEG'
    },
    atmosphere: {
      useISA: true,
      altitude: ISA_ALTITUDE,
      altitudeUnit: ISA_ALTITUDE_UNIT,
      pressure: ISA_PRESSURE,
      pressureUnit: ISA_PRESSURE_UNIT,
      temperature: ISA_TEMPERATURE,
      temperatureUnit: ISA_TEMPERATURE_UNIT,
      humidity: ISA_HUMIDITY
    },
    wind: {
      speed: 0,
      speedUnit: 'MPH',
      direction: 3,
      directionUnit: 'CLOCK'
    },
    adjustments: {
      elevation: 'MOA',
      windage: 'MOA',
      link: true
    }
  }),

  getters: {
    validShot: (state) => {
      let valid = true
      if (state.range.distance <= 0) {
        valid = false
      }
      return valid
    },
    getElevation: (state) => {
      let elevation
      if (state.validShot) {
        if (state.profileId) {
          const ProfilesStore = useProfilesStore()
          const profile = ref(ProfilesStore.profilebyId(state.profileId))
          if (profile.value) {
            let rangeCosinus
            if (state.elevation.unit === 'DEG') {
              rangeCosinus = Math.cos(state.elevation.angle * Math.PI / 180)
            }
            if (state.elevation.unit === 'COS') {
              rangeCosinus = state.elevation.angle
            }
            const horizontalDistance = state.range.distance * rangeCosinus
            state.range.step = horizontalDistance

            // params
            const params = {
              weapon: profile.value.weapon,
              optic: profile.value.optic,
              bullet: profile.value.bullet,
              measures: profile.value.measures,
              options: profile.value.options,
              range: {
                distance: horizontalDistance,
                unit: state.range.unit,
                step: horizontalDistance
              },
              atmosphere: state.atmosphere,
              wind: state.wind
            }

            const shotResults = ballisticCalculator(params)
            const trajectory = shotResults._trajectory[shotResults._trajectory.length - 1]

            if (shotResults) {
              if (state.adjustments.elevation === 'MOA') {
                elevation = trajectory.dropAdjustment.In(BC.Unit.MOA)
                elevation = Math.round(elevation * 10) / 10
              }
              if (state.adjustments.elevation === 'MRAD') {
                elevation = trajectory.dropAdjustment.In(BC.Unit.MRad)
                elevation = Math.round(elevation * 10) / 10
              }
              if (state.adjustments.elevation === 'IN') {
                elevation = trajectory.drop.In(BC.Unit.Inch)
                elevation = Math.round(elevation * 10) / 10
              }
              if (state.adjustments.elevation === 'FEET') {
                elevation = trajectory.drop.In(BC.Unit.Foot)
                elevation = Math.round(elevation * 100) / 100
              }
              if (state.adjustments.elevation === 'CM') {
                elevation = trajectory.drop.In(BC.Unit.Centimeter)
                elevation = Math.round(elevation * 10) / 10
              }
              if (state.adjustments.elevation === 'M') {
                elevation = trajectory.drop.In(BC.Unit.Meter)
                elevation = Math.round(elevation * 100) / 100
              }
            }
          }
        }
      }
      return elevation
    },
    getWindage: (state) => {
      let windage
      if (state.validShot) {
        if (state.profileId) {
          const ProfilesStore = useProfilesStore()
          const profile = ref(ProfilesStore.profilebyId(state.profileId))
          if (profile.value) {
            // params
            const params = {
              weapon: profile.value.weapon,
              optic: profile.value.optic,
              bullet: profile.value.bullet,
              measures: profile.value.measures,
              options: profile.value.options,
              range: {
                distance: state.range.distance,
                unit: state.range.unit,
                step: state.range.distance
              },
              atmosphere: state.atmosphere,
              wind: state.wind
            }

            const shotResults = ballisticCalculator(params)
            const trajectory = shotResults._trajectory[shotResults._trajectory.length - 1]

            if (shotResults) {
              if (state.adjustments.windage === 'MOA') {
                windage = trajectory.windageAdjustment.In(BC.Unit.MOA)
                windage = Math.round(windage * 10) / 10
              }
              if (state.adjustments.windage === 'MRAD') {
                windage = trajectory.windageAdjustment.In(BC.Unit.MRad)
                windage = Math.round(windage * 10) / 10
              }
              if (state.adjustments.windage === 'IN') {
                windage = trajectory.windage.In(BC.Unit.Inch)
                windage = Math.round(windage * 10) / 10
              }
              if (state.adjustments.windage === 'FEET') {
                windage = trajectory.windage.In(BC.Unit.Foot)
                windage = Math.round(windage * 100) / 100
              }
              if (state.adjustments.windage === 'CM') {
                windage = trajectory.windage.In(BC.Unit.Centimeter)
                windage = Math.round(windage * 10) / 10
              }
              if (state.adjustments.windage === 'M') {
                windage = trajectory.windage.In(BC.Unit.Meter)
                windage = Math.round(windage * 100) / 100
              }
            }
          }
        }
      }
      return windage
    },
    getTrajectory: (state) => {
      let trajectory
      if (state.validShot) {
        if (state.profileId) {
          const ProfilesStore = useProfilesStore()
          const profile = ref(ProfilesStore.profilebyId(state.profileId))
          if (profile.value) {
            // params
            const params = {
              weapon: profile.value.weapon,
              optic: profile.value.optic,
              bullet: profile.value.bullet,
              measures: profile.value.measures,
              options: profile.value.options,
              range: {
                distance: state.range.distance,
                unit: state.range.unit,
                step: state.range.distance
              },
              atmosphere: state.atmosphere,
              wind: state.wind
            }

            const shotResults = ballisticCalculator(params)
            trajectory = shotResults._trajectory[shotResults._trajectory.length - 1]
          }
        }
      }
      return trajectory
    }
  },

  actions: {

  },
  persist: true
})
