// constants

// distance
const METER_TO_YARD = 1.093613
const METER_TO_INCH = 39.37008
const METER_TO_FEET = 3.28084

// weight
const GRAM_TO_GRAIN = 15.43236
const GRAM_TO_OZ = 0.03527396
const GRAM_TO_LB = 0.002204623

// speed
const METER_PER_SECOND_TO_KILOMETER_PER_HOUR = 3.6
const METER_PER_SECOND_TO_FEET_PER_SECOND = 3.2808399
const METER_PER_SECOND_TO_MILE_PER_HOUR = 2.236936

// angle
const MRAD_TO_MOA = 3.43774677

export function convertLengthToMeter (
  value,
  unit
) {
  let meter = 0

  if (unit === 'KM') {
    meter = Number(value) * 1000
  }
  if (unit === 'M') {
    meter = Number(value)
  }
  if (unit === 'CM') {
    meter = Number(value) / 100
  }
  if (unit === 'MM') {
    meter = Number(value) / 1000
  }
  if (unit === 'YD') {
    meter = Number(value) / METER_TO_YARD
  }
  if (unit === 'FT') {
    meter = Number(value) / METER_TO_FEET
  }
  if (unit === 'IN') {
    meter = Number(value) / METER_TO_INCH
  }

  return meter
}

export function convertMeterToCM (
  value
) {
  return Number(value) * 100
}

export function convertMeterToYard (
  value
) {
  return Number(value) * METER_TO_YARD
}

export function convertMeterToInch (
  value
) {
  return Number(value) * METER_TO_INCH
}

export function convertWeightToGram (
  value,
  unit
) {
  let gram = 0

  if (unit === 'G') {
    gram = Number(value)
  }
  if (unit === 'KG') {
    gram = Number(value) * 1000
  }
  if (unit === 'TON') {
    gram = Number(value) * 1000000
  }
  if (unit === 'GR') {
    gram = Number(value) / GRAM_TO_GRAIN
  }
  if (unit === 'OZ') {
    gram = Number(value) / GRAM_TO_OZ
  }
  if (unit === 'LB') {
    gram = Number(value) / GRAM_TO_LB
  }

  return gram
}

export function convertSpeedToMeterPerSecond (
  value,
  unit
) {
  let meterPerSecond = 0
  if (unit === 'M/S') {
    meterPerSecond = Number(value)
  }
  if (unit === 'KM/H') {
    meterPerSecond = Number(value) / METER_PER_SECOND_TO_KILOMETER_PER_HOUR
  }
  if (unit === 'FPS') {
    meterPerSecond = Number(value) / METER_PER_SECOND_TO_FEET_PER_SECOND
  }
  if (unit === 'MPH') {
    meterPerSecond = Number(value) / METER_PER_SECOND_TO_MILE_PER_HOUR
  }
  return meterPerSecond
}

export function convertMRADtoMOA (value) {
  return Number(value) * MRAD_TO_MOA
}
