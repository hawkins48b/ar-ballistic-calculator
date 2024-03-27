// imports
import { defineStore } from 'pinia'
import { useProfilesStore } from './profiles'
import { reactive } from 'vue'
import * as BC from 'js-ballistics'
import Calculator from 'js-ballistics'

export const useCalculatorStore = defineStore('calculator', {
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
    }
  }),

  getters: {
    calculateTrajectory: (state) => {
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
      if (profile.bullet.velocityUnit === 'MM') {
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

      // set parameters
      const velocitydistance = BC.UNew.Yard(2) // default value

      const ammo = new BC.Ammo(dragModel, velocitydistance, bulletVelocity)
      const atmo = new BC.Atmo() // default atmospheric

      // fire shot
      const shot = new BC.Shot(maxRange)

      // calculate
      const calculator = new Calculator(weapon, ammo, atmo)
      const results = calculator.fire(shot, rangeStep)

      return results
    }
  },
  actions: {
  },
  persist: true
})
