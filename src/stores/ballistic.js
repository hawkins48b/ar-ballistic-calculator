// imports
import { defineStore } from 'pinia'
import { useProfilesStore } from './profiles'
import { reactive } from 'vue'
import * as BC from 'js-ballistics'
import Calculator from 'js-ballistics'

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
      angle: 90
    },
    shotAngle: {
      relativeAngle: 0
    },
    options: {
      showAtmospheric: false,
      showWindConditions: false,
      showVelocityGraph: false,
      showShotAngle: false
    }
  }),

  getters: {
    calculateTrajectory: (state) => {
      let results = null
      if (state.profileId) {
        const ProfilesStore = useProfilesStore()
        const profile = reactive(ProfilesStore.profilebyId(state.profileId))
        // define weapon parameters
        let opticHeight
        if (profile.optic.heightUnit === 'IN') {
          opticHeight = BC.UNew.Inch(parseFloat(profile.optic.height))
        }
        if (profile.optic.heightUnit === 'CM') {
          opticHeight = BC.UNew.Centimeter(parseFloat(profile.optic.height))
        }

        let zeroDistance
        if (state.zero.unit === 'YD') {
          zeroDistance = BC.UNew.Yard(parseFloat(state.zero.distance))
        }
        if (state.zero.unit === 'M') {
          zeroDistance = BC.UNew.Meter(parseFloat(state.zero.distance))
        }
        const weapon = new BC.Weapon(opticHeight, zeroDistance)

        // define ammo parameters
        let bulletWeight
        if (profile.bullet.weightUnit === 'GR') {
          bulletWeight = BC.UNew.Grain(parseFloat(profile.bullet.weight))
        }
        if (profile.bullet.weightUnit === 'G') {
          bulletWeight = BC.UNew.Gram(parseFloat(profile.bullet.weight))
        }

        let bulletDiameter
        if (profile.bullet.diameterUnit === 'IN') {
          bulletDiameter = BC.UNew.Inch(parseFloat(profile.bullet.diameter))
        }
        if (profile.bullet.diameterUnit === 'MM') {
          bulletDiameter = BC.UNew.Millimeter(parseFloat(profile.bullet.diameter))
        }

        let bulletVelocity
        if (profile.bullet.velocityUnit === 'FPS') {
          bulletVelocity = BC.UNew.FPS(parseFloat(profile.bullet.velocity))
        }
        if (profile.bullet.velocityUnit === 'MPS') {
          bulletVelocity = BC.UNew.MPS(parseFloat(profile.bullet.velocity))
        }

        // dragModel
        const ballisticCoefficient = parseFloat(profile.bullet.ballisticCoefficient)

        let ballisticCoefficientTable
        if (profile.bullet.ballisticCoefficientProfile === 'G1') {
          ballisticCoefficientTable = BC.Table.G1
        }
        if (profile.bullet.ballisticCoefficientProfile === 'G7') {
          ballisticCoefficientTable = BC.Table.G7
        }

        const dragModel = new BC.DragModel(ballisticCoefficient, ballisticCoefficientTable, bulletWeight, bulletDiameter)

        // range
        let maxRange
        if (state.range.unit === 'YD') {
          maxRange = BC.UNew.Yard(parseFloat(state.range.distance))
        }
        if (state.range.unit === 'M') {
          maxRange = BC.UNew.Meter(parseFloat(state.range.distance))
        }

        let rangeStep
        if (state.range.unit === 'YD') {
          rangeStep = BC.UNew.Yard(parseFloat(state.range.step))
        }
        if (state.range.unit === 'M') {
          rangeStep = BC.UNew.Meter(parseFloat(state.range.step))
        }

        // atmosphere
        let altitude
        if (state.atmosphere.altitudeUnit === 'FT') {
          altitude = BC.UNew.Foot(parseFloat(state.atmosphere.altitude))
        }
        if (state.atmosphere.altitudeUnit === 'M') {
          altitude = BC.UNew.Meter(parseFloat(state.atmosphere.altitude))
        }

        let pressure
        if (state.atmosphere.pressureUnit === 'IN/HG') {
          pressure = BC.UNew.InHg(parseFloat(state.atmosphere.pressure))
        }
        if (state.atmosphere.pressureUnit === 'HPA') {
          pressure = BC.UNew.hPa(parseFloat(state.atmosphere.pressure))
        }

        let temperature
        if (state.atmosphere.temperatureUnit === '°F') {
          temperature = BC.UNew.Fahrenheit(parseFloat(state.atmosphere.temperature))
        }
        if (state.atmosphere.temperatureUnit === '°C') {
          temperature = BC.UNew.Celsius(parseFloat(state.atmosphere.temperature))
        }

        const humidity = parseFloat(state.atmosphere.humidity) / 100
        // set atmosphere
        const atmo = new BC.Atmo(altitude, pressure, temperature, humidity)

        // Wind conditions
        let windSpeed
        if (state.wind.speedUnit === 'MPH') {
          windSpeed = BC.UNew.MPH(parseFloat(state.wind.speed))
        }
        if (state.wind.speedUnit === 'MPS') {
          windSpeed = BC.UNew.MPS(parseFloat(state.wind.speed))
        }

        const windAngle = BC.UNew.Degree(parseFloat(state.wind.angle))
        const windsArray = []
        if (windSpeed.In(BC.Unit.MPS) > 0) {
          const wind = new BC.Wind(windSpeed, windAngle)
          windsArray.push(wind)
        }

        // Shot angle
        const relativeAngle = BC.UNew.Degree(parseFloat(state.shotAngle.relativeAngle))

        // set parameters
        const velocitydistance = BC.UNew.Inch(2) // default value

        const ammo = new BC.Ammo(dragModel, velocitydistance, bulletVelocity)

        // fire shot
        /*
        constructor(
        maxRange: (number | Distance) = UNew.Yard(1000),
        zeroAngle: (number | Angular) = UNew.Degree(0),
        relativeAngle: (number | Angular) = UNew.Degree(0),
        cantAngle: (number | Angular) = UNew.Degree(0),
        atmo: Atmo = Atmo.icao(),
        winds: Wind[] = [new Wind()]
        )
        */
        const shot = new BC.Shot(maxRange, BC.UNew.Degree(0), relativeAngle, BC.UNew.Degree(0), atmo, windsArray)

        // calculate
        const calculator = new Calculator(weapon, ammo, atmo)
        results = calculator.fire(shot, rangeStep)
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
      this.wind.angle = 90
    },
    resetShotAngle () {
      this.shotAngle.relativeAngle = 0
    },
    removeProfile () {
      this.profileId = null
    }
  },
  persist: true
})
