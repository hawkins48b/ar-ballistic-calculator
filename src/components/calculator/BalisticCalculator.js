import {
  convertLengthToMeter,
  convertWeightToGram,
  convertSpeedToMeterPerSecond,
  convertMeterToCM,
  convertMeterToYard,
  convertMeterToInch,
  convertMRADtoMOA,
  convertMStoFPS
} from './UnitConverter.js'

export function calculateAdjustments (calcArgs) {
  const results = []

  // convert units
  const bulletWeightKG = convertWeightToGram(calcArgs.profile.bulletWeight, calcArgs.profile.bulletWeightUnit) / 1000
  const bulletVelocityMS = convertSpeedToMeterPerSecond(calcArgs.profile.bulletVelocity, calcArgs.profile.bulletVelocityUnit)
  const bulletCrossSectionalAreaM2 = getCrossSectionalAreaM2(convertLengthToMeter(calcArgs.profile.bulletDiameter, calcArgs.profile.bulletDiameterUnit))
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
    const ballisticResults = ballisticCalculator(
      bulletWeightKG,
      bulletVelocityMS,
      bulletCrossSectionalAreaM2,
      ballisticCoefficient,
      ballisticCoefficientProfile,
      angleRadian,
      airDensityKGM3,
      -opticHeightM,
      distanceM
    )

    // elevation results in different units
    const elevationM = ballisticResults.elevationM
    const elevationCM = convertMeterToCM(elevationM)
    const elevationIN = convertMeterToInch(elevationM)

    // distance results in different units
    const distanceYD = convertMeterToYard(distanceM)

    // corrections results in different units
    const correctionMRAD = calculateMRADCorrection(distanceM, elevationM)
    const correctionMOA = convertMRADtoMOA(correctionMRAD)

    // velocity
    const velocityMS = ballisticResults.velocityMS
    const velocityFPS = convertMStoFPS(velocityMS)

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
        correctionMOA,
        // velocity
        velocityMS,
        velocityFPS
      }
    )
    distanceM += distanceStepM
  }
  console.log(results)
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
  initialVelocityMS, // Meters per second (m/s)
  bulletCrossSectionalAreaM2,
  ballisticCoefficient, // lb/in2
  ballisticCoefficientProfile, // G1
  angleRadian, // Radian
  airDensityKGM3, // Kilograms per cubic meter (kg/m³)
  initialYpositionM, // Meter
  requestedDistanceM // Meter
) {
  const gravitationalAcceleration = 9.80665 // gravitational acceleration in m/s^2
  let velocityX = initialVelocityMS * Math.cos(angleRadian) // Initial velocity in x-direction
  let velocityY = initialVelocityMS * Math.sin(angleRadian) // Initial velocity in y-direction
  let xPosition = 0 // Initial x-position
  let yPosition = initialYpositionM // Initial y-position
  let finalVelocity = 0 // Variable to store the final velocity
  const timeStep = 0.001

  // Loop until the projectile reaches the requested distance
  while (xPosition < requestedDistanceM) {
  // Calculate drag forces for both axes
    const dragForceX = calculateDragForce(
      airDensityKGM3,
      velocityX,
      ballisticCoefficient,
      ballisticCoefficientProfile,
      bulletCrossSectionalAreaM2
    )
    const dragForceY = calculateDragForce(
      airDensityKGM3,
      velocityY,
      ballisticCoefficient,
      ballisticCoefficientProfile,
      bulletCrossSectionalAreaM2
    )

    // Calculate acceleration in the y-direction including gravitational acceleration and drag force
    const accelerationX = -dragForceX / bulletWeightKg

    // Calculate acceleration in the y-direction including gravitational acceleration and drag force
    const accelerationY = (-dragForceY / bulletWeightKg) - gravitationalAcceleration

    // Update velocity using RK4 integration
    const k1x = timeStep * accelerationX
    const k1y = timeStep * accelerationY

    const k2x = timeStep * (accelerationX + 0.5 * k1x)
    const k2y = timeStep * (accelerationY + 0.5 * k1y)

    const k3x = timeStep * (accelerationX + 0.5 * k2x)
    const k3y = timeStep * (accelerationY + 0.5 * k2y)

    const k4x = timeStep * (accelerationX + k3x)
    const k4y = timeStep * (accelerationY + k3y)

    velocityX += (k1x + 2 * k2x + 2 * k3x + k4x) / 6
    velocityY += (k1y + 2 * k2y + 2 * k3y + k4y) / 6

    // Update x-position using current velocity in the x-direction
    xPosition += velocityX * timeStep

    // Update y-position using current velocity
    yPosition += velocityY * timeStep

    // Update final velocity when the projectile reaches the requested distance
    if (xPosition >= requestedDistanceM) {
      finalVelocity = Math.sqrt(velocityX ** 2 + velocityY ** 2)
    }
  }

  return {
    elevationM: yPosition,
    velocityMS: finalVelocity
  }
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
