export function calculateG1ElevationAdjustments (
  g1BC,
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
  const timeStep = 0.001 // in seconds

  // Variables
  const elevationAdjustments = []
  let totalTime = 0

  // Perform ballistic calculation
  let position = 0 // starting position
  let velocity = initialVelocity

  // Perform numerical integration
  while (position <= distanceMax) {
    // Calculate drag force using the G1 drag function
    const dragForce = 0.5 * rhoAir * velocity ** 2 * g1BC * crossSectionalArea

    // Calculate acceleration (F = ma)
    const acceleration = -dragForce / bulletWeight

    // Update velocity and position using Euler's method
    velocity += acceleration * timeStep
    position += velocity * timeStep

    // Zeroing adjustment
    const zeroingAdjustment = position <= zeroingDistance ? 0 : (position - zeroingDistance) * Math.tan(Math.asin(velocity / initialVelocity) + rifleAngle)

    // Append the elevation adjustment to the list for every 'step' meters
    const myDistance = Math.round(position)
    if (myDistance % step === 0 || myDistance === 0) {
      if (!checkIfDistanceExist(elevationAdjustments, myDistance)) {
        elevationAdjustments.push({ distance: myDistance, adjustment: Math.round(zeroingAdjustment * 10) / 10, time: Math.round(totalTime * 10) / 10 })
      }
    }

    // Increment time
    totalTime += timeStep
  }

  return elevationAdjustments
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

export function getCrossSectionalArea (
  bulletDiameter // in Meter
) {
  return Math.PI * Math.pow(0.5 * bulletDiameter, 2) // in m^2
}

function checkIfDistanceExist (array, distance) {
  let distanceFound = false
  for (const item of array) {
    if (item.distance === distance) {
      distanceFound = true
    }
  }
  return distanceFound
}
