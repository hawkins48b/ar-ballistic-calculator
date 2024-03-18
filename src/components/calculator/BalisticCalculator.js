import {
  zeroDistanceInMeters,
  distanceStepInMeter,
  distanceMaxInMeter,
  opticHeightInMeter,
  bulletDiameterInMeter,
  bulletWeightInKg,
  velocityInMetersPerSecond
} from './UnitConverter.js'

export function calculateElevationAdjustmentsG1 (
  g1BC,
  opticHeight,
  zeroingDistance,
  bulletWeight,
  crossSectionalArea,
  initialVelocity,
  distanceMax,
  DistanceStep
) {
  // Constants
  const rhoAir = 1.225 // Air density in kg/m^3 (standard conditions)

  // Calculate the rifle angle based on the zeroing distance and optic height
  const rifleAngle = Math.atan(opticHeight / zeroingDistance)

  // Perform ballistic calculation
  let position = 0 // starting position
  let velocity = initialVelocity
  let totalTime = 0

  // Result array
  const elevationResults = []

  // Perform numerical integration
  while (position <= distanceMax) {
    // Calculate drag force using the G1 drag function
    const dragForce = 0.5 * rhoAir * velocity ** 2 * g1BC * crossSectionalArea

    // Calculate acceleration (F = ma)
    const acceleration = -dragForce / bulletWeight

    // Update velocity and position using Euler's method
    velocity += acceleration * DistanceStep
    position += velocity * DistanceStep

    // Round the position to ensure it aligns with the DistanceStep size
    position = Math.round(position / DistanceStep) * DistanceStep

    // Calculate time taken to reach current position
    const timeTaken = position / velocity

    // Zeroing adjustment
    const zeroingAdjustment =
      position <= zeroingDistance
        ? 0
        : (position - zeroingDistance) * Math.tan(Math.asin(velocity / initialVelocity) + rifleAngle)

    // Convert the zeroing adjustment to centimeters and round to 1 decimal place
    const elevation = Math.round(zeroingAdjustment * 100 * 10) / 10

    // Add result to the array
    elevationResults.push({ distance: position, elevation, time: totalTime })

    // Increment total time
    totalTime += timeTaken
  }

  return elevationResults
}

export function calculateG7ElevationAdjustments (
  g7BC,
  opticHeight, // in meters
  zeroingDistance, // in meters
  bulletWeight, // in kg
  crossSectionalArea, // in m^2
  initialVelocity, // in m/s
  distanceMax, // in meters
  step // in meters
) {
  // Constants
  const rhoAir = 1.225 // air density in kg/m^3 (standard conditions)

  // Calculate the rifle angle based on the zeroing distance and optic height
  const rifleAngle = Math.atan(opticHeight / zeroingDistance)

  // Time step for numerical integration (you can adjust this based on accuracy needed)
  const timeStep = 0.01 // in seconds

  // Variables
  const elevationAdjustments = []
  let totalTime = 0

  // Perform ballistic calculation
  let position = 0 // starting position
  let velocity = initialVelocity

  // Perform numerical integration
  while (position <= distanceMax) {
    // Calculate drag force using the G7 drag function
    const dragForce = 0.5 * rhoAir * velocity ** 2 * g7BC * crossSectionalArea

    // Calculate acceleration (F = ma)
    const acceleration = -dragForce / bulletWeight

    // Update velocity and position using Euler's method
    velocity += acceleration * timeStep
    position += velocity * timeStep

    // Zeroing adjustment
    const zeroingAdjustment = position <= zeroingDistance ? 0 : (position - zeroingDistance) * Math.tan(Math.asin(velocity / initialVelocity) + rifleAngle)

    // Append the elevation adjustment to the list for every 'step' meters
    if (position % step === 0) {
      elevationAdjustments.push({ distance: position, adjustment: zeroingAdjustment, time: totalTime })
    }

    // Increment time
    totalTime += timeStep
  }

  return elevationAdjustments
}

export function calculateAdjustments (calcArgs) {
  let results = []
  if (calcArgs.profile.bulletBallisticCoefficientProfile === 'G1') {
    results = calculateElevationAdjustmentsG1(
      calcArgs.profile.bulletBallisticCoefficient,
      opticHeightInMeter(calcArgs.profile.opticHeight, calcArgs.profile.opticHeightUnit),
      zeroDistanceInMeters(calcArgs.zeroDistance, calcArgs.zeroDistanceUnit),
      bulletWeightInKg(calcArgs.profile.bulletWeight, calcArgs.profile.bulletWeightUnit),
      getCrossSectionalArea(bulletDiameterInMeter(calcArgs.profile.bulletDiameter, calcArgs.profile.bulletDiameterUnit)),
      velocityInMetersPerSecond(calcArgs.profile.bulletVelocity, calcArgs.profile.bulletVelocityUnit),
      distanceMaxInMeter(calcArgs.resultsRange, calcArgs.resultsUnit),
      distanceStepInMeter(calcArgs.resultsStep, calcArgs.resultsUnit)
    )
  }
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
