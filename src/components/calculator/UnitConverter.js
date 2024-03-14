export function zeroDistanceInMeters (
  value,
  unit
) {
  let zeroDistanceInMeter = 0
  if (unit === 'meter') {
    zeroDistanceInMeter = parseFloat(value)
  }
  if (unit === 'yard') {
    zeroDistanceInMeter = parseFloat(value) * 0.9144
  }
  return zeroDistanceInMeter
}

export function distanceStepInMeter (
  value,
  unit
) {
  let distanceStepInMeter = 0
  if (unit === 'meter') {
    distanceStepInMeter = parseFloat(value)
  }
  if (unit === 'yard') {
    distanceStepInMeter = parseFloat(value) * 0.9144
  }
  return distanceStepInMeter
}

export function elevationInMetersToUnit (
  value,
  unit
) {
  let distanceInMetersToUnit = 0
  if (unit === 'meter') {
    distanceInMetersToUnit = parseFloat(value)
  }
  if (unit === 'yard') {
    distanceInMetersToUnit = parseFloat(value) / 0.9144
  }
  return distanceInMetersToUnit
}

export function distanceMaxInMeter (
  value,
  unit
) {
  let distanceMaxInMeter = 0
  if (unit === 'meter') {
    distanceMaxInMeter = parseFloat(value)
  }
  if (unit === 'yard') {
    distanceMaxInMeter = parseFloat(value) * 0.9144
  }
  return distanceMaxInMeter
}

export function opticHeightInMeter (
  value,
  unit
) {
  let opticHeightInMeter = 0
  if (unit === 'cm') {
    opticHeightInMeter = parseFloat(value) / 100
  }
  if (unit === 'inch') {
    opticHeightInMeter = parseFloat(value) * 0.0254
  }
  return opticHeightInMeter
}

export function bulletDiameterInMeter (
  value,
  unit
) {
  let bulletDiameterInMeter = 0
  if (unit === 'mm') {
    bulletDiameterInMeter = parseFloat(value) / 1000
  }
  if (unit === 'inch') {
    bulletDiameterInMeter = parseFloat(value) * 0.0254
  }
  return bulletDiameterInMeter
}

export function bulletWeightInKg (
  value,
  unit
) {
  let bulletWeightInKg = 0
  if (unit === 'grain') {
    bulletWeightInKg = parseFloat(value) * 0.00006479891
  }
  if (unit === 'gram') {
    bulletWeightInKg = parseFloat(value) / 1000
  }
  return bulletWeightInKg
}

export function velocityInMetersPerSecond (
  value,
  unit
) {
  let velocityInMetersPerSecond = 0
  if (unit === 'm/s') {
    velocityInMetersPerSecond = parseFloat(value)
  }
  if (unit === 'FPS') {
    velocityInMetersPerSecond = parseFloat(value) * 0.3048
  }
  return velocityInMetersPerSecond
}
