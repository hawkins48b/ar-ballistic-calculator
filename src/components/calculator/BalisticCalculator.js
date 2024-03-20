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
  bulletWeightKg, // Kilograms (kg)
  bulletCrossSectionalAreaM2, // m2
  initialVelocityMS, // Meters per second (m/s)
  ballisticCoefficient, // Dimensionless
  angleRadian, // Radian
  airDensityKGM3, // Kilograms per cubic meter (kg/m³)
  initialYpositionM, // Meter
  requestedDistanceM // Meter
) {
  console.log('--------------------------')
  console.log('bulletWeightKg', bulletWeightKg)
  console.log('bulletCrossSectionalAreaM2', bulletCrossSectionalAreaM2)
  console.log('initialVelocityMS', initialVelocityMS)
  console.log('ballisticCoefficient', ballisticCoefficient)
  console.log('angleRadian', angleRadian)
  console.log('airDensityKGM3', airDensityKGM3)
  console.log('initialYpositionM', initialYpositionM)
  console.log('requestedDistanceM', requestedDistanceM)
  console.log('--------------------------')
  const gravitationalAcceleration = 9.81 // gravitational acceleration in m/s^2
  const velocityX = initialVelocityMS * Math.cos(angleRadian) // Initial velocity in x-direction
  let velocityY = initialVelocityMS * Math.sin(angleRadian) // Initial velocity in y-direction
  let xPosition = 0 // Initial x-position
  let yPosition = initialYpositionM // Initial y-position
  const timeStep = 0.001

  // Loop until the projectile reaches the requested distance
  while (xPosition < requestedDistanceM) {
    // Calculate drag force in the y-direction
    const dragForceY = 0.5 * airDensityKGM3 * velocityY * velocityY * ballisticCoefficient * bulletCrossSectionalAreaM2

    // Calculate acceleration in the y-direction including gravitational acceleration and drag force
    const accelerationY = (-dragForceY / bulletWeightKg) - gravitationalAcceleration

    // Update velocity in the y-direction using acceleration
    velocityY += accelerationY * timeStep

    // Update y-position using current velocity
    yPosition += velocityY * timeStep

    // Update x-position using current velocity in the x-direction
    xPosition += velocityX * timeStep
  }

  return yPosition
}

export function calculateAdjustments (calcArgs) {
  const results = []

  // convert units
  const bulletWeightKG = convertWeightToGram(calcArgs.profile.bulletWeight, calcArgs.profile.bulletWeightUnit) / 1000
  const bulletCrossSectionalAreaM2 = getCrossSectionalAreaM2(convertLengthToMeter(calcArgs.profile.bulletDiameter, calcArgs.profile.bulletDiameterUnit))
  console.log('bulletCrossSectionalAreaM2', bulletCrossSectionalAreaM2)
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
        bulletWeightKG,
        bulletCrossSectionalAreaM2,
        velocityMS,
        ballisticCoefficient,
        angleRadian,
        airDensityKGM3,
        -opticHeightM,
        distanceM
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
  return correctionMRAD * -1
}
