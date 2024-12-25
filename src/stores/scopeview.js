import { defineStore } from 'pinia'

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
    }
  }),

  getters: {
  },

  actions: {
  },
  persist: true
})
