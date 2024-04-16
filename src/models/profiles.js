export default function () {
  return {
    weapon: {
      name: '',
      barrelTwist: 0,
      barrelTwistUnit: 'IN'
    },
    optic: {
      model: '',
      height: '',
      heightUnit: 'IN'
    },
    bullet: {
      brand: '',
      weight: 0,
      weightUnit: 'GR',
      diameter: 0,
      diameterUnit: 'IN',
      ballisticCoefficient: 0,
      ballisticCoefficientProfile: 'G1',
      length: 0,
      lengthUnit: 'IN'
    },
    measures: {
      velocity: 0,
      velocityUnit: 'FPS',
      temperatureModifier: 0,
      temperature: 59,
      temperatureUnit: '°F',
      accuracy: 2,
      accuracyUnit: 'MOA'
    },
    options: {
      enableSpinDrift: false,
      enablePowderSensitivity: false
    }
  }
}
