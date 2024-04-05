// imports
import ballisticCalculator from 'src/controller/ballistic-calculator'
import { defineStore } from 'pinia'
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

export const useBallisticStore = defineStore('ballistic', {
  state: () => ({
    profileId: null,
    zero: {
      distance: 25,
      unit: 'YD'
    },
    range: {
      distance: 500,
      unit: 'YD',
      step: 25
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
    sightAdjustment: {
      angle: 0,
      unit: 'MOA'
    },
    options: {
      showAtmospheric: false,
      showWindConditions: false,
      showVelocityGraph: false,
      showSightAdjustment: false
    },
    results: {
      table: {
        visibleColumns: ['rangeYD', 'rangeM', 'elevationIN', 'elevationCM', 'elevationAdjustmentMOA', 'elevationAdjustmentMRAD']
      }
    }
  }),

  getters: {
    distanceUnit: (state) => {
      let unit
      if (state.range.unit === 'YD') {
        unit = BC.Unit.Yard
      }
      if (state.range.unit === 'M') {
        unit = BC.Unit.Meter
      }
      return unit
    },
    elevationUnit: (state) => {
      let unit
      if (state.range.unit === 'YD') {
        unit = BC.Unit.Inch
      }
      if (state.range.unit === 'M') {
        unit = BC.Unit.Centimeter
      }
      return unit
    },
    calculateShot: (state) => {
      let results = null
      if (state.profileId) {
        const ProfilesStore = useProfilesStore()
        const profile = ref(ProfilesStore.profilebyId(state.profileId))

        const params = {
          weapon: profile.value.weapon,
          optic: profile.value.optic,
          bullet: profile.value.bullet,
          measures: profile.value.measures,
          options: profile.value.options,
          range: state.range,
          zero: state.zero,
          atmosphere: state.atmosphere,
          wind: state.wind,
          sightAdjustment: state.sightAdjustment
        }
        results = ballisticCalculator(params)
      }
      return results
    },
    calculateShotStep1: (state) => {
      let results = null
      if (state.profileId) {
        const ProfilesStore = useProfilesStore()
        const profile = ref(ProfilesStore.profilebyId(state.profileId))

        const params = {
          weapon: profile.value.weapon,
          optic: profile.value.optic,
          bullet: profile.value.bullet,
          measures: profile.value.measures,
          options: profile.value.options,
          range: {
            distance: state.range.distance,
            unit: state.range.unit,
            step: 1
          },
          zero: state.zero,
          atmosphere: state.atmosphere,
          wind: state.wind,
          sightAdjustment: state.sightAdjustment
        }
        results = ballisticCalculator(params, true)
      }
      return results
    }
  },
  actions: {
    setISA () {
      this.atmosphere.altitude = ISA_ALTITUDE
      this.atmosphere.altitudeUnit = ISA_ALTITUDE_UNIT
      this.atmosphere.pressure = ISA_PRESSURE
      this.atmosphere.pressureUnit = ISA_PRESSURE_UNIT
      this.atmosphere.temperature = ISA_TEMPERATURE
      this.atmosphere.temperatureUnit = ISA_TEMPERATURE_UNIT
      this.atmosphere.humidity = ISA_HUMIDITY
    },
    resetWind () {
      this.wind.speed = 0
      this.wind.speedUnit = 'MPH'
      this.wind.direction = 3
    },
    resetSightAdjustment () {
      this.sightAdjustment.angle = 0
    },
    removeProfile () {
      this.profileId = null
    }
  },
  persist: true
})
