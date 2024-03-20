import {
  convertLengthToMeter,
  convertWeightToGram,
  convertSpeedToMeterPerSecond,
  convertMeterToCM,
  convertMeterToYard,
  convertMeterToInch,
  convertMRADtoMOA
} from './UnitConverter.js'

export function calculateAdjustments (calcArgs) {
  const results = []

  // convert units
  const bulletWeightKG = convertWeightToGram(calcArgs.profile.bulletWeight, calcArgs.profile.bulletWeightUnit) / 1000
  const bulletCrossSectionalAreaM2 = getCrossSectionalAreaM2(convertLengthToMeter(calcArgs.profile.bulletDiameter, calcArgs.profile.bulletDiameterUnit))
  const velocityMS = convertSpeedToMeterPerSecond(calcArgs.profile.bulletVelocity, calcArgs.profile.bulletVelocityUnit)
  const ballisticCoefficient = Number(calcArgs.profile.bulletBallisticCoefficient)
  const ballisticCoefficientProfile = calcArgs.profile.bulletBallisticCoefficientProfile
  const airDensityKGM3 = 1.225
  const opticHeightM = convertLengthToMeter(calcArgs.profile.opticHeight, calcArgs.profile.opticHeightUnit)
  const zeroDistanceM = convertLengthToMeter(calcArgs.zeroDistance, calcArgs.zeroDistanceUnit)
  const angleRadian = getAngleInRadian(opticHeightM, zeroDistanceM)
  const distanceMaxM = convertLengthToMeter(calcArgs.resultsRange, calcArgs.resultsUnit)
  const distanceStepM = convertLengthToMeter(calcArgs.resultsStep, calcArgs.resultsUnit)

  let distanceM = 0
  while (distanceM <= distanceMaxM) {
    const elevationM = ballisticCalculator(
      bulletWeightKG,
      bulletCrossSectionalAreaM2,
      velocityMS,
      ballisticCoefficient,
      ballisticCoefficientProfile,
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

function ballisticCalculator (
  bulletWeightKg, // Kilograms (kg)
  bulletCrossSectionalAreaM2, // m2
  initialVelocityMS, // Meters per second (m/s)
  ballisticCoefficient, // Dimensionless
  ballisticCoefficientProfile, // G1 or G7
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
  console.log('ballisticCoefficientProfile', ballisticCoefficientProfile)
  console.log('angleRadian', angleRadian)
  console.log('airDensityKGM3', airDensityKGM3)
  console.log('initialYpositionM', initialYpositionM)
  console.log('requestedDistanceM', requestedDistanceM)

  const gravitationalAcceleration = 9.80665 // gravitational acceleration in m/s^2
  let velocityX = initialVelocityMS * Math.cos(angleRadian) // Initial velocity in x-direction
  let velocityY = initialVelocityMS * Math.sin(angleRadian) // Initial velocity in y-direction
  let xPosition = 0 // Initial x-position
  let yPosition = initialYpositionM // Initial y-position
  const timeStep = 0.0001

  // Loop until the projectile reaches the requested distance
  while (xPosition < requestedDistanceM) {
    // Calculate drag forces for both axes
    const dragForceX = calculateDragForce(
      airDensityKGM3,
      velocityX,
      ballisticCoefficient,
      ballisticCoefficientProfile,
      bulletCrossSectionalAreaM2)
    const dragForceY = calculateDragForce(
      airDensityKGM3,
      velocityY,
      ballisticCoefficient,
      ballisticCoefficientProfile,
      bulletCrossSectionalAreaM2)

    // Calculate acceleration in the y-direction including gravitational acceleration and drag force
    const accelerationX = (-dragForceX / bulletWeightKg)

    // Calculate acceleration in the y-direction including gravitational acceleration and drag force
    const accelerationY = (-dragForceY / bulletWeightKg) - gravitationalAcceleration

    // Update velocity in the y-direction using acceleration
    velocityX += accelerationX * timeStep

    // Update velocity in the y-direction using acceleration
    velocityY += accelerationY * timeStep

    // Update x-position using current velocity in the x-direction
    xPosition += velocityX * timeStep

    // Update y-position using current velocity
    yPosition += velocityY * timeStep
  }

  return yPosition
}

export function calculateDragForce (
  airDensityKGM3,
  velocity,
  ballisticCoefficient,
  ballisticCoefficientProfile,
  bulletCrossSectionalAreaM2
) {
  let dragForce = 0

  if (ballisticCoefficientProfile === 'G1') {
    dragForce = 0.5 * airDensityKGM3 * Math.pow(velocity, 2) * ballisticCoefficient * bulletCrossSectionalAreaM2
  }
  if (ballisticCoefficientProfile === 'G7') {
    const g7Coef = g7Coefficient(
      ballisticCoefficient,
      velocity,
      airDensityKGM3
    )
    dragForce = 0.5 * airDensityKGM3 * Math.pow(velocity, 2) * bulletCrossSectionalAreaM2 * g7Coef
  }

  return dragForce
}

export function g7Coefficient (
  g7BallisticCoefficient,
  velocity,
  airDensityKGM3
) {
  // Calculate speed of sound based on air density (using standard formula at sea level and 20°C)
  const speedOfSound = Math.sqrt(1.4 * 287.05 * (273.15 + 20)) * Math.sqrt(airDensityKGM3 / 1.225)

  // Calculate Mach number
  const machNumber = velocity / speedOfSound

  // G7 coefficients
  const cd0 = 0.5 * g7BallisticCoefficient

  // Calculate the G7 drag coefficient using the G-model formula
  const dragCoefficient = cd0 * (1 + (1 / 4) * machNumber * machNumber + (1 / 16) * machNumber * machNumber * machNumber * machNumber)

  // Return the calculated drag coefficient
  return dragCoefficient
}
