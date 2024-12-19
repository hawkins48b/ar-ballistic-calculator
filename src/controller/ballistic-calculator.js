import * as BC from 'js-ballistics'
import Calculator from 'js-ballistics'

export default function (params, addExtra) {
  let results = null

  // define weapon parameters
  let opticHeight
  if (params.optic.heightUnit === 'IN') {
    opticHeight = BC.UNew.Inch(parseFloat(params.optic.height))
  }
  if (params.optic.heightUnit === 'CM') {
    opticHeight = BC.UNew.Centimeter(parseFloat(params.optic.height))
  }

  let zeroDistance
  if (params.optic.zeroUnit === 'YD') {
    zeroDistance = BC.UNew.Yard(Math.abs(parseFloat(params.optic.zero)))
  }
  if (params.optic.zeroUnit === 'M') {
    zeroDistance = BC.UNew.Meter(Math.abs(parseFloat(params.optic.zero)))
  }

  let barrelTwist = BC.UNew.Inch(0)
  if (params.options.enableSpinDrift) {
    if (params.weapon.barrelTwistUnit === 'IN') {
      barrelTwist = BC.UNew.Inch(parseFloat(params.weapon.barrelTwist))
    }
    if (params.weapon.barrelTwistUnit === 'MM') {
      barrelTwist = BC.UNew.Millimeter(parseFloat(params.weapon.barrelTwist))
    }
  }
  /*
  sightHeight: (number | Distance) = UNew.Inch(2),
  zeroDistance: (number | Distance) = UNew.Yard(100),
  twist: (number | Distance) = UNew.Inch(0),
  zeroLookAngle: (number | Angular) = UNew.MIL(0)
  */
  const weapon = new BC.Weapon(opticHeight, zeroDistance, barrelTwist)

  // define ammo parameters
  let bulletWeight
  if (params.bullet.weightUnit === 'GR') {
    bulletWeight = BC.UNew.Grain(parseFloat(params.bullet.weight))
  }
  if (params.bullet.weightUnit === 'G') {
    bulletWeight = BC.UNew.Gram(parseFloat(params.bullet.weight))
  }

  let bulletDiameter
  if (params.bullet.diameterUnit === 'IN') {
    bulletDiameter = BC.UNew.Inch(parseFloat(params.bullet.diameter))
  }
  if (params.bullet.diameterUnit === 'MM') {
    bulletDiameter = BC.UNew.Millimeter(parseFloat(params.bullet.diameter))
  }

  let bulletVelocity
  if (params.measures.velocityUnit === 'FPS') {
    bulletVelocity = BC.UNew.FPS(parseFloat(params.measures.velocity))
  }
  if (params.measures.velocityUnit === 'MPS') {
    bulletVelocity = BC.UNew.MPS(parseFloat(params.measures.velocity))
  }

  // dragModel
  const ballisticCoefficient = parseFloat(params.bullet.ballisticCoefficient)

  let ballisticCoefficientTable
  if (params.bullet.ballisticCoefficientProfile === 'G1') {
    ballisticCoefficientTable = BC.Table.G1
  }
  if (params.bullet.ballisticCoefficientProfile === 'G7') {
    ballisticCoefficientTable = BC.Table.G7
  }

  const dragModel = new BC.DragModel(ballisticCoefficient, ballisticCoefficientTable, bulletWeight, bulletDiameter)

  // range
  let maxRange
  if (params.range.unit === 'YD') {
    maxRange = BC.UNew.Yard(Math.abs(parseFloat(params.range.distance)))
  }
  if (params.range.unit === 'M') {
    maxRange = BC.UNew.Meter(Math.abs(parseFloat(params.range.distance)))
  }

  let rangeStep
  if (params.range.unit === 'YD') {
    rangeStep = BC.UNew.Yard(Math.abs(parseFloat(params.range.step)))
  }
  if (params.range.unit === 'M') {
    rangeStep = BC.UNew.Meter(Math.abs(parseFloat(params.range.step)))
  }

  // atmosphere
  let atmo = new BC.Atmo()
  if (params.atmosphere) {
    let altitude
    if (params.atmosphere.altitudeUnit === 'FT') {
      altitude = BC.UNew.Foot(parseFloat(params.atmosphere.altitude))
    }
    if (params.atmosphere.altitudeUnit === 'M') {
      altitude = BC.UNew.Meter(parseFloat(params.atmosphere.altitude))
    }

    let pressure
    if (params.atmosphere.pressureUnit === 'IN/HG') {
      pressure = BC.UNew.InHg(parseFloat(params.atmosphere.pressure))
    }
    if (params.atmosphere.pressureUnit === 'HPA') {
      pressure = BC.UNew.hPa(parseFloat(params.atmosphere.pressure))
    }

    let temperature
    if (params.atmosphere.temperatureUnit === '°F') {
      temperature = BC.UNew.Fahrenheit(parseFloat(params.atmosphere.temperature))
    }
    if (params.atmosphere.temperatureUnit === '°C') {
      temperature = BC.UNew.Celsius(parseFloat(params.atmosphere.temperature))
    }

    const humidity = parseFloat(params.atmosphere.humidity) / 100
    // set atmosphere
    atmo = new BC.Atmo(altitude, pressure, temperature, humidity)
  }

  // Wind conditions
  const windsArray = []
  if (params.wind) {
    let windSpeed
    if (params.wind.speedUnit === 'MPH') {
      windSpeed = BC.UNew.MPH(parseFloat(params.wind.speed))
    }
    if (params.wind.speedUnit === 'MPS') {
      windSpeed = BC.UNew.MPS(parseFloat(params.wind.speed))
    }

    let windAngle
    if (params.wind.directionUnit === 'CLOCK') {
      windAngle = BC.UNew.OClock(parseFloat(params.wind.direction))
    }
    if (params.wind.directionUnit === 'DEG') {
      windAngle = BC.UNew.Degree(parseFloat(params.wind.direction))
    }

    if (windSpeed.In(BC.Unit.MPS) > 0) {
      const wind = new BC.Wind(windSpeed, windAngle)
      windsArray.push(wind)
    }
  }

  // sight Adjustment
  let relativeAngle = BC.UNew.Degree(0)
  if (params.sightAdjustment) {
    if (params.sightAdjustment.unit === 'MOA') {
      relativeAngle = BC.UNew.MOA(parseFloat(params.sightAdjustment.angle))
    }
    if (params.sightAdjustment.unit === 'MRAD') {
      relativeAngle = BC.UNew.MIL(parseFloat(params.sightAdjustment.angle))
    }
  }

  let bulletLength = BC.UNew.Inch(2) // default value
  if (params.options.enableSpinDrift) {
    if (params.bullet.lengthUnit === 'IN') {
      bulletLength = BC.UNew.Inch(parseFloat(params.bullet.length))
    }
    if (params.bullet.lengthUnit === 'MM') {
      bulletLength = BC.UNew.Millimeter(parseFloat(params.bullet.length))
    }
  }

  let tempModifier = 0
  let powderTemp = BC.UNew.Celsius(15)
  if (params.options.enablePowderSensitivity) {
    if (params.measures.temperatureUnit === '°F') {
      powderTemp = BC.UNew.Fahrenheit(parseFloat(params.measures.temperature))
    }
    if (params.measures.temperatureUnit === '°C') {
      powderTemp = BC.UNew.Celsius(parseFloat(params.measures.temperature))
    }
    tempModifier = parseFloat(params.measures.temperatureModifier) / 100
    // enable powder sensibility
    BC.calcSettings.USE_POWDER_SENSITIVITY = true
  }

  /* BC.Ammo
    dm: DragModel,
    length: (number | Distance) = UNew.Inch(2),
    mv: (number | Velocity) = UNew.FPS(2700),
    tempModifier: number = 0,
    powderTemp: (number | Temperature) = UNew.Celsius(15))
  */
  const ammo = new BC.Ammo(dragModel, bulletLength, bulletVelocity, tempModifier, powderTemp)

  /* BC.Shot
  constructor(
  maxRange: (number | Distance) = UNew.Yard(1000),
  zeroAngle: (number | Angular) = UNew.Degree(0),
  relativeAngle: (number | Angular) = UNew.Degree(0),
  cantAngle: (number | Angular) = UNew.Degree(0),
  atmo: Atmo = Atmo.icao(),
  winds: Wind[] = [new Wind()]
  )
  */
  const shot = new BC.Shot(maxRange, BC.UNew.Degree(0), relativeAngle, BC.UNew.Degree(0), atmo, windsArray)

  // calculate
  const calculator = new Calculator(weapon, ammo, atmo)
  results = calculator.fire(shot, rangeStep)

  if (addExtra) {
    results = addExtraData(results)
  }

  return results
}

function addExtraData (shot) {
  // Max elevations
  let maxOrdinance = BC.UNew.Millimeter(0)
  let maxOrdinanceMM = 0
  let maxOrdinanceDistance = BC.UNew.Millimeter(0)
  shot._trajectory.forEach(trajectory => {
    if (trajectory.drop.In(BC.Unit.Millimeter) > maxOrdinanceMM) {
      maxOrdinanceMM = trajectory.drop.In(BC.Unit.Millimeter)
      maxOrdinance = trajectory.drop
      maxOrdinanceDistance = trajectory.distance
    }
  })
  shot.maxOrdinance = {
    elevation: maxOrdinance,
    distance: maxOrdinanceDistance
  }

  shot._trajectory.forEach((trajectory) => {
    const drop = Math.round(trajectory.drop.In(BC.Unit.Centimeter) * 10) / 10 // round to centimeter for better results
    const distance = trajectory.distance.In(BC.Unit.Millimeter)
    if (drop <= 0 && distance <= shot.maxOrdinance.distance.In(BC.Unit.Millimeter)) {
      shot.nearZero = trajectory.distance
    }
    if (drop >= 0 && distance > shot.maxOrdinance.distance.In(BC.Unit.Millimeter)) {
      shot.farZero = trajectory.distance
    }
  })

  return shot
}
