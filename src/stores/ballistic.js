// imports
import ballisticCalculator from 'src/controller/ballistic-calculator'
import { defineStore } from 'pinia'
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
    setupId: null,
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
    VelocityUnit: (state) => {
      let unit
      if (state.range.unit === 'YD') {
        unit = BC.Unit.FPS
      }
      if (state.range.unit === 'M') {
        unit = BC.Unit.MPS
      }
      return unit
    },
    VelocityLabel: (state) => {
      let label
      if (state.range.unit === 'YD') {
        label = 'FPS'
      }
      if (state.range.unit === 'M') {
        label = 'MPS'
      }
      return label
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
    calculateShot: async (state) => {
      let results = null
      if (state.setupId) {
        const options = {
          range: state.range,
          atmosphere: state.atmosphere,
          wind: state.wind,
          sightAdjustment: state.sightAdjustment
        }

        if (state.isCalculationValid) {
          results = await ballisticCalculator(state.setupId, options)
        }
      }
      return results
    },
    calculateShotStep1: (state) => {
      let results = null
      if (state.setupId) {
        const options = {
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
        if (state.isCalculationValid) {
          results = ballisticCalculator(state.setupId, options, true)
        }
      }
      return results
    },
    isCalculationValid: (state) => {
      let isValid = false

      const distance = parseFloat(state.range.distance)

      if (distance <= 3000) {
        isValid = true
      }

      return isValid
    },
    getISA: () => {
      const atmosphere = {}
      atmosphere.altitude = ISA_ALTITUDE
      atmosphere.altitudeUnit = ISA_ALTITUDE_UNIT
      atmosphere.pressure = ISA_PRESSURE
      atmosphere.pressureUnit = ISA_PRESSURE_UNIT
      atmosphere.temperature = ISA_TEMPERATURE
      atmosphere.temperatureUnit = ISA_TEMPERATURE_UNIT
      atmosphere.humidity = ISA_HUMIDITY
      atmosphere.useISA = true

      return atmosphere
    }
  },
  actions: {
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
