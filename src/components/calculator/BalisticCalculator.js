import {
  zeroDistanceInMeters,
  // distanceStepInMeter,
  distanceMaxInMeter,
  opticHeightInMeter,
  // bulletDiameterInMeter,
  bulletWeightInKg,
  velocityInMetersPerSecond
} from './UnitConverter.js'

function ballisticCalculatorG1 (
  bulletWeight,
  initialSpeed,
  ballisticCoefficient,
  airDensity,
  maxDistance,
  opticHeight,
  zeroDistance) {
  const g = 9.81 // Acceleration due to gravity (m/s^2)
  const timeStep = 0.001 // Time step for calculation
  const results = []
  let distance = 0
  let elevation = -opticHeight // Initial elevation
  let flightTime = 0

  // while (distance <= maxDistance) {
  // Calculate drag force
  const dragForce = 0.5 * ballisticCoefficient * airDensity * Math.pow(initialSpeed, 2)
  console.log('dragForce', dragForce)

  // Calculate acceleration due to drag
  // const dragAccel = -dragForce / bulletWeight
  const dragAccel = -0.31
  console.log('dragAccel', dragAccel)

  // Calculate gravitational acceleration component
  const gravityAccel = -g
  console.log('gravityAccel', gravityAccel)

  // Calculate total acceleration
  const totalAccel = gravityAccel + dragAccel
  console.log('totalAccel', totalAccel)

  // Calculate new velocity using acceleration
  const newVelocity = initialSpeed + totalAccel * timeStep
  console.log('newVelocity', newVelocity)

  // Calculate new distance using velocity
  const newDistance = distance + newVelocity * timeStep
  console.log('newDistance', newDistance)

  // Calculate new elevation using bullet trajectory
  const newElevation = -opticHeight + Math.atan((newDistance - zeroDistance) / zeroDistance) * (180 / Math.PI) * 100
  console.log('newElevation', newElevation)

  // Update variables
  initialSpeed = newVelocity
  distance = newDistance
  elevation = newElevation

  // Push results to arrays
  results.push({
    distance,
    elevation,
    flightTime
  })

  flightTime += timeStep
  // }

  return results
}

export function calculateAdjustments (calcArgs) {
  const results = []
  if (calcArgs.profile.bulletBallisticCoefficientProfile === 'G1') {
    const results = ballisticCalculatorG1(
      bulletWeightInKg(calcArgs.profile.bulletWeight, calcArgs.profile.bulletWeightUnit),
      velocityInMetersPerSecond(calcArgs.profile.bulletVelocity, calcArgs.profile.bulletVelocityUnit),
      calcArgs.profile.bulletBallisticCoefficient,
      1.225,
      distanceMaxInMeter(calcArgs.resultsRange, calcArgs.resultsRangeUnit),
      opticHeightInMeter(calcArgs.profile.opticHeight, calcArgs.profile.opticHeightUnit),
      zeroDistanceInMeters(calcArgs.zeroDistance, calcArgs.zeroDistanceUnit)
    )

    console.log(results)

    /*
  bulletWeight,
  initialSpeed,
  ballisticCoefficient,
  airDensity,
  maxDistance,
  opticHeight,
  zeroDistance
  */
  }
  /*
  if (calcArgs.profile.bulletBallisticCoefficientProfile === 'G7') {
    results = calculateG7ElevationAdjustments(
      calcArgs.profile.bulletBallisticCoefficient,
      opticHeightInMeter(calcArgs.profile.rifleOpticHeight, calcArgs.profile.rifleOpticHeightUnit),
      zeroDistanceInMeters(calcArgs.zeroDistance, calcArgs.zeroDistanceUnit),
      bulletWeightInKg(calcArgs.profile.bulletWeight, calcArgs.profile.bulletWeightUnit),
      getCrossSectionalArea(bulletDiameterInMeter(calcArgs.profile.bulletDiameter, calcArgs.profile.bulletDiameterUnit)),
      velocityInMetersPerSecond(calcArgs.profile.bulletVelocity, calcArgs.profile.bulletVelocityUnit),
      distanceMaxInMeter(calcArgs.resultsRange, calcArgs.resultsUnit),
      distanceStepInMeter(calcArgs.resultsStep, calcArgs.resultsUnit)
    )
  }
  */

  return results
}

export function getCrossSectionalArea (
  bulletDiameter // in Meter
) {
  return Math.PI * Math.pow(0.5 * bulletDiameter, 2) // in m^2
}
/*
function checkIfDistanceExist (array, distance) {
  let distanceFound = false
  for (const item of array) {
    if (item.distance === distance) {
      distanceFound = true
    }
  }
  return distanceFound
}
*/
