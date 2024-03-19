import {
  convertLengthToMeter,
  convertWeightToGram,
  convertSpeedToMeterPerSecond,
  convertMeterToCM,
  convertMeterToYard,
  convertMeterToInch,
  convertMRADtoMOA
} from './UnitConverter.js'

function ballisticCalculatorG1 (
  bulletWeight, // Kilograms (kg)
  bulletCrossSectionalArea, // m2
  initialSpeed, // Meters per second (m/s)
  ballisticCoefficient, // Dimensionless
  angle, // Radian
  airDensity // Kilograms per cubic meter (kg/m³)
) {
  return 0.0254
}

export function calculateAdjustments (calcArgs) {
  const results = []

  // convert units
  const bulletWeightGram = convertWeightToGram(calcArgs.profile.bulletWeight, calcArgs.profile.bulletWeightUnit)
  const bulletCrossSectionalAreaM2 = getCrossSectionalAreaM2(convertLengthToMeter(calcArgs.profile.bulletDiameter, calcArgs.profile.bulletDiameterUnit))
  const velocityMS = convertSpeedToMeterPerSecond(calcArgs.profile.bulletVelocity, calcArgs.profile.bulletVelocityUnit)
  const ballisticCoefficient = Number(calcArgs.profile.bulletBallisticCoefficient)
  const airDensityKGM3 = 1.225
  const opticHeightM = convertLengthToMeter(calcArgs.profile.opticHeight, calcArgs.profile.opticHeightUnit)
  const zeroDistanceM = convertLengthToMeter(calcArgs.zeroDistance, calcArgs.zeroDistanceUnit)
  const angleRadian = getAngleInRadian(opticHeightM, zeroDistanceM)
  const distanceMaxM = convertLengthToMeter(calcArgs.resultsRange, calcArgs.resultsUnit)
  const distanceStepM = convertLengthToMeter(calcArgs.resultsStep, calcArgs.resultsUnit)

  if (calcArgs.profile.bulletBallisticCoefficientProfile === 'G1') {
    let distanceM = 0
    while (distanceM <= distanceMaxM) {
      const elevationM = ballisticCalculatorG1(
        bulletWeightGram,
        bulletCrossSectionalAreaM2,
        velocityMS,
        ballisticCoefficient,
        angleRadian,
        airDensityKGM3
      )

      // elevation results in different units
      const elevationCM = convertMeterToCM(elevationM)
      const elevationIN = convertMeterToInch(elevationM)

      // distance results in different units
      const distanceYD = convertMeterToYard(distanceM)

      // corrections results in different units
      const correctionMRAD = calculateMRADCorrection(distanceM, elevationM)
      const correctionMOA = convertMRADtoMOA(correctionMRAD)
      // results
      results.push(
        {
          // distance
          distanceM,
          distanceYD,
          // elevation
          elevationM,
          elevationCM,
          elevationIN,
          // correction
          correctionMRAD,
          correctionMOA
        }
      )
      distanceM += distanceStepM
    }
  }

  return results
}

export function getCrossSectionalAreaM2 (
  bulletDiameter // in Meter
) {
  return Math.PI * Math.pow(0.5 * Number(bulletDiameter), 2) // in m^2
}

export function getAngleInRadian (
  opticHeight, // in Meter
  zeroDistance // in Meter
) {
  return Math.atan(opticHeight / zeroDistance)
}

export function calculateMRADCorrection (
  distanceM, // in Meter
  elevationM // in Meter
) {
  let correctionMRAD = 0
  if (distanceM > 0) {
    correctionMRAD = elevationM * 1000 / distanceM
  } else {
    correctionMRAD = 0
  }
  return correctionMRAD
}
