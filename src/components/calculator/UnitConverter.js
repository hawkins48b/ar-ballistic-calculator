export function zeroDistanceInMeters (
  value,
  unit
) {
  let zeroDistanceInMeter = 0

  if (unit === 'meter') {
    zeroDistanceInMeter = Number(value)
  }
  if (unit === 'yard') {
    zeroDistanceInMeter = Number(value) * 0.9144
  }
  return zeroDistanceInMeter
}

export function distanceStepInMeter (
  value,
  unit
) {
  let distanceStepInMeter = 0
  if (unit === 'meter') {
    distanceStepInMeter = Number(value)
  }
  if (unit === 'yard') {
    distanceStepInMeter = Number(value) * 0.9144
  }
  return distanceStepInMeter
}

export function elevationInMetersToUnit (
  value,
  unit
) {
  let distanceInMetersToUnit = 0
  if (unit === 'meter') {
    distanceInMetersToUnit = Number(value)
  }
  if (unit === 'yard') {
    distanceInMetersToUnit = Number(value) / 0.9144
  }
  return distanceInMetersToUnit
}

export function distanceMaxInMeter (
  value,
  unit
) {
  let distanceMaxInMeter = 0
  if (unit === 'meter') {
    distanceMaxInMeter = Number(value)
  }
  if (unit === 'yard') {
    distanceMaxInMeter = Number(value) * 0.9144
  }
  return distanceMaxInMeter
}

export function opticHeightInMeter (
  value,
  unit
) {
  let opticHeightInMeter = 0
  if (unit === 'cm') {
    opticHeightInMeter = Number(value) / 100
  }
  if (unit === 'inch') {
    opticHeightInMeter = Number(value) * 0.0254
  }
  return opticHeightInMeter
}

export function bulletDiameterInMeter (
  value,
  unit
) {
  let bulletDiameterInMeter = 0
  if (unit === 'mm') {
    bulletDiameterInMeter = Number(value) / 1000
  }
  if (unit === 'inch') {
    bulletDiameterInMeter = Number(value) * 0.0254
  }
  return bulletDiameterInMeter
}

export function bulletWeightInKg (
  value,
  unit
) {
  let bulletWeightInKg = 0
  if (unit === 'grain') {
    bulletWeightInKg = Number(value) * 0.00006479891
  }
  if (unit === 'gram') {
    bulletWeightInKg = Number(value) / 1000
  }
  return bulletWeightInKg
}

export function velocityInMetersPerSecond (
  value,
  unit
) {
  let velocityInMetersPerSecond = 0
  if (unit === 'm/s') {
    velocityInMetersPerSecond = Number(value)
  }
  if (unit === 'FPS') {
    velocityInMetersPerSecond = Number(value) * 0.3048
  }
  return velocityInMetersPerSecond
}
