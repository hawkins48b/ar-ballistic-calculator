import {
  zeroDistanceInMeters,
  // distanceStepInMeter,
  distanceMaxInMeter,
  opticHeightInMeter,
  bulletDiameterInMeter,
  bulletWeightInKg,
  velocityInMetersPerSecond
} from './UnitConverter.js'

function ballisticCalculatorG1 (
  bulletWeight, // Kilograms (kg)
  bulletCrossSectionalArea, // m2
  initialSpeed, // Meters per second (m/s)
  ballisticCoefficient, // Dimensionless
  airDensity, // Kilograms per cubic meter (kg/m³)
  maxDistance, // Meters (m)
  opticHeight, // Meters (m)
  zeroDistance // Meters (m)
) {
  console.log('bulletWeight', bulletWeight)
  console.log('initialSpeed', initialSpeed)
  console.log('ballisticCoefficient', ballisticCoefficient)
  console.log('airDensity', airDensity)
  console.log('maxDistance', maxDistance)
  console.log('opticHeight', opticHeight)
  console.log('zeroDistance', zeroDistance)
  console.log('----------------------------')
  const g = 9.81 // Acceleration due to gravity (m/s²)
  const timeStep = 0.001 // Time step for calculation
  const results = []
  let distance = 0
  let elevation = -opticHeight // Initial elevation
  let flightTime = 0
  let velocity = initialSpeed

  // Push initial result with t = 0 and elevation equal to -opticHeight
  results.push({
    distance: 0,
    elevation: Math.round(-opticHeight * 100 * 10) / 10,
    flightTime: 0
  })

  while (distance <= maxDistance) {
  // Calculate drag force using ballistic coefficient
    const dragForce = 0.5 * airDensity * Math.pow(velocity, 2) * ballisticCoefficient * bulletCrossSectionalArea
    console.log('dragForce', dragForce)
    // Calculate acceleration due to drag
    const dragAccel = -dragForce / bulletWeight
    console.log('dragAccel', dragAccel)

    // Calculate gravitational acceleration component
    const gravityAccel = -g
    console.log('gravityAccel', gravityAccel)

    // Calculate total acceleration
    const totalAccel = gravityAccel + dragAccel
    console.log('totalAccel', totalAccel)

    // Use simple Euler integration to update velocity and distance
    velocity += totalAccel * timeStep
    console.log('velocity', velocity)

    distance += velocity * timeStep
    console.log('distance', distance)

    // Calculate new elevation using bullet trajectory and gravity
    elevation = -opticHeight +
      Math.atan((distance - zeroDistance) / zeroDistance) * opticHeight * 100 -
      0.5 * g * Math.pow(flightTime, 2)
    console.log('elevation', elevation)

    // Push results to arrays
    results.push({
      distance: Math.round(distance),
      elevation: Math.round(elevation * 10) / 10,
      flightTime: Math.round(flightTime * 10) / 10
    })

    // Update flight time
    flightTime += timeStep
  }

  // remove duplicates

  return results
}

export function calculateAdjustments (calcArgs) {
  let results = []

  const bulletWeight = bulletWeightInKg(calcArgs.profile.bulletWeight, calcArgs.profile.bulletWeightUnit)
  const bulletCrossSectionalArea = getCrossSectionalArea(bulletDiameterInMeter(calcArgs.profile.bulletDiameter, calcArgs.profile.bulletDiameterUnit))
  const velocity = velocityInMetersPerSecond(calcArgs.profile.bulletVelocity, calcArgs.profile.bulletVelocityUnit)
  const ballisticCoefficient = Number(calcArgs.profile.bulletBallisticCoefficient)
  const airDensity = 1.225
  const distanceMax = distanceMaxInMeter(calcArgs.resultsRange, calcArgs.resultsUnit)
  const opticHeight = opticHeightInMeter(calcArgs.profile.opticHeight, calcArgs.profile.opticHeightUnit)
  const zeroDistance = zeroDistanceInMeters(calcArgs.zeroDistance, calcArgs.zeroDistanceUnit)

  if (calcArgs.profile.bulletBallisticCoefficientProfile === 'G1') {
    results = ballisticCalculatorG1(
      bulletWeight,
      bulletCrossSectionalArea,
      velocity,
      ballisticCoefficient,
      airDensity,
      distanceMax,
      opticHeight,
      zeroDistance
    )

    console.log('calculateAdjustments', results)
  }

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
