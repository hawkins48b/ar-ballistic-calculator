import * as BC from 'js-ballistics'
import Calculator from 'js-ballistics'
import { useSetupStore } from 'src/stores/profiles/setup'
import { useAmmunitionStore } from 'stores/profiles/ammunition'

export default async function (setupId, options, addExtra) {
  return new Promise((resolve, reject) => {
    const setupStore = useSetupStore()
    const setup = setupStore.getSetup(setupId)

    if (setupStore.setupStatus(setup) === 'completed') {
      let shotFired = null

      const weapon = newWeapon(setup)
      const dragModel = newDragModel(setup)
      const atmo = newAtmo(options)
      const ammo = newAmmo(setup, dragModel, atmo)
      const winds = setWinds(options)
      const maxRange = setMaxRange(options)
      const rangeStep = setRangeStep(options)
      const relativeAngle = setRelativeAngle(options)

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
      const shot = new BC.Shot(maxRange, BC.UNew.Degree(0), relativeAngle, BC.UNew.Degree(0), atmo, winds)

      // calculate
      const calculator = new Calculator(weapon, ammo, atmo)
      shotFired = calculator.fire(shot, rangeStep)

      if (addExtra) {
        shotFired = addExtraData(shotFired)
      }

      resolve(shotFired)
    } else {
      reject('Setup not completed')
    }
  })
}

function newWeapon (setup) {
  let opticHeight
  if (setup.measureOpticHeightUnit === 'IN') {
    opticHeight = BC.UNew.Inch(parseFloat(setup.measureOpticHeight))
  }
  if (setup.measureOpticHeightUnit === 'CM') {
    opticHeight = BC.UNew.Centimeter(parseFloat(setup.measureOpticHeight))
  }

  let zeroDistance
  if (setup.measureZeroDistanceUnit === 'YD') {
    zeroDistance = BC.UNew.Yard(Math.abs(parseFloat(setup.measureZeroDistance)))
  }
  if (setup.measureZeroDistanceUnit === 'M') {
    zeroDistance = BC.UNew.Meter(Math.abs(parseFloat(setup.measureZeroDistance)))
  }

  let barrelTwist
  if (setup.firearm.barrelTwistUnit === 'IN') {
    barrelTwist = BC.UNew.Inch(parseFloat(setup.firearm.barrelTwist))
  }
  if (setup.firearm.barrelTwistUnit === 'MM') {
    barrelTwist = BC.UNew.Millimeter(parseFloat(setup.firearm.barrelTwist))
  }

  /*
  sightHeight: (number | Distance) = UNew.Inch(2),
  zeroDistance: (number | Distance) = UNew.Yard(100),
  twist: (number | Distance) = UNew.Inch(0),
  zeroLookAngle: (number | Angular) = UNew.MIL(0)
  */
  const weapon = new BC.Weapon(opticHeight, zeroDistance, barrelTwist)

  return weapon
}

function newDragModel (setup) {
  let bulletWeight
  if (setup.ammunition.weightUnit === 'GR') {
    bulletWeight = BC.UNew.Grain(parseFloat(setup.ammunition.weight))
  }
  if (setup.ammunition.weightUnit === 'G') {
    bulletWeight = BC.UNew.Gram(parseFloat(setup.ammunition.weight))
  }

  let bulletDiameter
  if (setup.ammunition.diameterUnit === 'IN') {
    bulletDiameter = BC.UNew.Inch(parseFloat(setup.ammunition.diameter))
  }
  if (setup.ammunition.diameterUnit === 'MM') {
    bulletDiameter = BC.UNew.Millimeter(parseFloat(setup.ammunition.diameter))
  }

  // dragModel
  const ballisticCoefficient = parseFloat(setup.ammunition.ballisticCoefficient)

  let ballisticCoefficientTable
  if (setup.ammunition.ballisticCoefficientProfile === 'G1') {
    ballisticCoefficientTable = BC.Table.G1
  }
  if (setup.ammunition.ballisticCoefficientProfile === 'G7') {
    ballisticCoefficientTable = BC.Table.G7
  }

  const dragModel = new BC.DragModel(ballisticCoefficient, ballisticCoefficientTable, bulletWeight, bulletDiameter)
  return dragModel
}

function newAtmo (options) {
  // atmosphere
  let atmo = new BC.Atmo()
  if (options.atmosphere) {
    let altitude
    if (options.atmosphere.altitudeUnit === 'FT') {
      altitude = BC.UNew.Foot(parseFloat(options.atmosphere.altitude))
    }
    if (options.atmosphere.altitudeUnit === 'M') {
      altitude = BC.UNew.Meter(parseFloat(options.atmosphere.altitude))
    }

    let pressure
    if (options.atmosphere.pressureUnit === 'IN/HG') {
      pressure = BC.UNew.InHg(parseFloat(options.atmosphere.pressure))
    }
    if (options.atmosphere.pressureUnit === 'HPA') {
      pressure = BC.UNew.hPa(parseFloat(options.atmosphere.pressure))
    }

    let temperature
    if (options.atmosphere.temperatureUnit === '°F') {
      temperature = BC.UNew.Fahrenheit(parseFloat(options.atmosphere.temperature))
    }
    if (options.atmosphere.temperatureUnit === '°C') {
      temperature = BC.UNew.Celsius(parseFloat(options.atmosphere.temperature))
    }

    const humidity = parseFloat(options.atmosphere.humidity) / 100
    // set atmosphere
    atmo = new BC.Atmo(altitude, pressure, temperature, humidity)
  }
  return atmo
}

function newAmmo (setup, dragModel, atmo) {
  const ammunitionStore = useAmmunitionStore()

  let bulletLength = BC.UNew.Inch(2) // default value
  if (setup.ammunition.bulletLengthUnit === 'IN') {
    bulletLength = BC.UNew.Inch(parseFloat(setup.ammunition.bulletLength))
  }
  if (setup.ammunition.bulletLengthUnit === 'MM') {
    bulletLength = BC.UNew.Millimeter(parseFloat(setup.ammunition.bulletLength))
  }

  let bulletVelocity
  if (setup.measureVelocityUnit === 'FPS') {
    bulletVelocity = BC.UNew.FPS(parseFloat(setup.measureVelocity))
  }
  if (setup.ammunition.bulletLengthUnit === 'MPS') {
    bulletVelocity = BC.UNew.MPS(parseFloat(setup.measureVelocity))
  }

  let tempModifier = 0
  if (setup.ammunition.usePowderSensitivity) {
    if (setup.ammunition.powderModifierUnit === 'FPS/°F') {
      tempModifier = ammunitionStore.convertMPSbyCtoFPSbyF(parseFloat(setup.ammunition.powderModifier))
    }
    if (setup.ammunition.powderModifierUnit === 'MPS/°C') {
      tempModifier = parseFloat(setup.ammunition.powderModifier)
    }
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
  const ammo = new BC.Ammo(dragModel, bulletLength, bulletVelocity, tempModifier, atmo.temperature)

  return ammo
}

function setWinds (options) {
  // Wind conditions
  const windsArray = []
  if (options.wind) {
    let windSpeed
    if (options.wind.speedUnit === 'MPH') {
      windSpeed = BC.UNew.MPH(parseFloat(options.wind.speed))
    }
    if (options.wind.speedUnit === 'MPS') {
      windSpeed = BC.UNew.MPS(parseFloat(options.wind.speed))
    }

    let windAngle
    if (options.wind.directionUnit === 'CLOCK') {
      windAngle = BC.UNew.OClock(parseFloat(options.wind.direction))
    }
    if (options.wind.directionUnit === 'DEG') {
      windAngle = BC.UNew.Degree(parseFloat(options.wind.direction))
    }

    if (windSpeed.In(BC.Unit.MPS) > 0) {
      const wind = new BC.Wind(windSpeed, windAngle)
      windsArray.push(wind)
    }
  }
  return windsArray
}

function setMaxRange (options) {
  // range
  let maxRange
  if (options.range.unit === 'YD') {
    maxRange = BC.UNew.Yard(Math.abs(parseFloat(options.range.distance)))
  }
  if (options.range.unit === 'M') {
    maxRange = BC.UNew.Meter(Math.abs(parseFloat(options.range.distance)))
  }

  return maxRange
}

function setRangeStep (options) {
  let rangeStep
  if (options.range.unit === 'YD') {
    rangeStep = BC.UNew.Yard(Math.abs(parseFloat(options.range.step)))
  }
  if (options.range.unit === 'M') {
    rangeStep = BC.UNew.Meter(Math.abs(parseFloat(options.range.step)))
  }

  return rangeStep
}

function setRelativeAngle (options) {
  // sight Adjustment
  let relativeAngle = BC.UNew.Degree(0)
  if (options.sightAdjustment) {
    if (options.sightAdjustment.unit === 'MOA') {
      relativeAngle = BC.UNew.MOA(parseFloat(options.sightAdjustment.angle))
    }
    if (options.sightAdjustment.unit === 'MRAD') {
      relativeAngle = BC.UNew.MIL(parseFloat(options.sightAdjustment.angle))
    }
  }

  return relativeAngle
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

  // if the zero distance is below 100y, use the zero distance for near zero
  if (shot.weapon.zeroDistance.In(BC.Unit.Yard) <= 100) {
    shot.nearZero = shot.weapon.zeroDistance
  }
  return shot
}
