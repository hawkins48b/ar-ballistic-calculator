import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { useProfilesStore } from 'src/stores/profiles'
import * as BC from 'js-ballistics'
import ballisticCalculator from 'src/controller/ballistic-calculator'

const PDF_UNIT = 1 / 72
const PDF_URL_AR_DATASHEET_IMPERIAL = '/pdf/rifle-dataset-imperial.pdf'
const PDF_PRIMARY_COLOR = rgb(0.03529411764705882, 0.47843137254901963, 0.20392156862745098)

export default async function (profileId) {
  // load pdf
  const pdfDoc = await loadPDF(PDF_URL_AR_DATASHEET_IMPERIAL)
  // embed font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // page 1
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { height } = firstPage.getSize()

  // use profile
  const profileStore = useProfilesStore()
  const profile = profileStore.profilebyId(profileId)

  const shotParam = {
    weapon: profile.weapon,
    optic: profile.optic,
    bullet: profile.bullet,
    measures: profile.measures,
    options: profile.options,
    range: {
      distance: 500,
      unit: 'YD',
      step: 1
    },
    wind: {
      speed: 0,
      speedUnit: 'MPH',
      direction: 3,
      directionUnit: 'CLOCK'
    }
  }
  const shot1 = ballisticCalculator(shotParam, true)

  shotParam.range.step = 25
  const shot25 = ballisticCalculator(shotParam)

  shotParam.wind.speed = 8
  const shot25Wind8 = ballisticCalculator(shotParam)

  shotParam.wind.speed = 20
  const shot25Wind20 = ballisticCalculator(shotParam)

  if (profile) {
    // fill header
    fillHeader()

    // fill graph
    fillGraph()

    // fill points of aim
    fillPointsOfAim()
  }

  return pdfDoc

  function fillHeader () {
    // weapon name
    firstPage.drawText(profile.weapon.name, {
      x: 1.88 / PDF_UNIT,
      y: height - 0.59 / PDF_UNIT,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })
    // ammo
    firstPage.drawText(profile.bullet.brand, {
      x: 4 / PDF_UNIT,
      y: height - 0.59 / PDF_UNIT,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })
    // near zero
    let nearZero = profile.optic.zero
    if (profile.optic.zeroUnit === 'M') {
      nearZero = Math.round(BC.UNew.Meter(nearZero).In(BC.Unit.Yard))
    }
    nearZero = nearZero + ''
    firstPage.drawText(nearZero, {
      x: 7.34 / PDF_UNIT,
      y: height - 0.59 / PDF_UNIT,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })
    // 25m zero
    const trajectory25Yd = shot1._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === 25)
    const zero25m = (trajectory25Yd.drop.In(BC.Unit.Inch) > 0 ? '+' : '') + Math.round(trajectory25Yd.drop.In(BC.Unit.Inch) * 10) / 10 + ''
    firstPage.drawText(zero25m, {
      x: 9.32 / PDF_UNIT,
      y: height - 0.59 / PDF_UNIT,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })
    // optic
    firstPage.drawText(profile.optic.model, {
      x: 1.88 / PDF_UNIT,
      y: height - 0.97 / PDF_UNIT,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })
    // Ballistic coefficient
    firstPage.drawText(profile.bullet.ballisticCoefficient + ' ' + profile.bullet.ballisticCoefficientProfile, {
      x: 4.41 / PDF_UNIT,
      y: height - 0.97 / PDF_UNIT,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })
    // far zero
    if (shot1.farZero) {
      const farZero = Math.round(shot1.farZero.In(BC.Unit.Yard) * 10) / 10 + ''
      firstPage.drawText(farZero, {
        x: 7.34 / PDF_UNIT,
        y: height - 0.97 / PDF_UNIT,
        size: 11,
        helveticaFont,
        color: PDF_PRIMARY_COLOR
      })
    }
    // 100m zero
    const trajectory100Yd = shot1._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === 100)
    const zero100Yd = (trajectory100Yd.drop.In(BC.Unit.Inch) > 0 ? '+' : '') + Math.round(trajectory100Yd.drop.In(BC.Unit.Inch) * 10) / 10 + ''
    firstPage.drawText(zero100Yd, {
      x: 9.32 / PDF_UNIT,
      y: height - 0.97 / PDF_UNIT,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })
    // height over bore
    let heightOverBore = profile.optic.height
    if (profile.optic.heightUnit === 'CM') {
      heightOverBore = Math.round(BC.UNew.Centimeter(heightOverBore).In(BC.Unit.Inch) * 10) / 10
    }
    firstPage.drawText(heightOverBore + '', {
      x: 2.81 / PDF_UNIT,
      y: height - 1.36 / PDF_UNIT,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })
    // velocity
    let velocity = profile.measures.velocity
    if (profile.measures.velocityUnit === 'MPS') {
      velocity = Math.round(BC.UNew.MPS(profile.measures.velocity).In(BC.Unit.FPS) * 10) / 10
    }
    firstPage.drawText(velocity + '', {
      x: 4.60 / PDF_UNIT,
      y: height - 1.36 / PDF_UNIT,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })
  }

  function fillGraph () {
    const GRAPH_START_X = 1.25
    const GRAPH_START_Y = 2.22
    const GRAPH_X_INC = 8.88 / 500
    const GRAPH_Y_INC = 3.73 / 100

    let x
    let y
    let previousX
    let previousY

    shot25._trajectory.forEach(trajectory => {
      if (x) {
        previousX = x
      }
      if (y) {
        previousY = y
      }
      x = (trajectory.distance.In(BC.Unit.Yard) * GRAPH_X_INC + GRAPH_START_X) / PDF_UNIT
      y = height - (GRAPH_START_Y + trajectory.drop.In(BC.Unit.Inch) * -1 * GRAPH_Y_INC) / PDF_UNIT

      // line between circles
      if (previousX && previousY) {
        firstPage.drawLine({
          start: { x: previousX, y: previousY },
          end: { x, y },
          thickness: 2,
          color: PDF_PRIMARY_COLOR,
          opacity: 0.75
        })
      }
      // circle
      firstPage.drawCircle({
        x,
        y,
        size: 5,
        borderWidth: 0,
        color: PDF_PRIMARY_COLOR
      })
      // label
      const label = (trajectory.drop.In(BC.Unit.Inch) > 0 ? '+' : '') + Math.round(trajectory.drop.In(BC.Unit.Inch) * 10) / 10 + ''
      firstPage.drawRectangle({
        x: x - 2,
        y: y - 25,
        width: 3 + label.length * 5,
        height: 15,
        borderColor: PDF_PRIMARY_COLOR,
        borderWidth: 1,
        color: rgb(1, 1, 1)
      })
      firstPage.drawText(label, {
        x,
        y: y - 20,
        size: 9,
        helveticaFont,
        color: PDF_PRIMARY_COLOR
      })
    })
  }

  function fillPointsOfAim () {
    const GRAPH_INITIAL_Y = 7.09
    const GRAPH_XY_INC = 1.93 / 40
    let initialX
    let x
    let y
    let distance
    let trajectory
    let label
    // 200m no wind
    distance = 200
    initialX = 2.01
    trajectory = shot25._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === distance)
    x = initialX / PDF_UNIT
    y = height - (GRAPH_INITIAL_Y + trajectory.dropAdjustment.In(BC.Unit.MOA) * GRAPH_XY_INC) / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = (trajectory.dropAdjustment.In(BC.Unit.MOA) < 0 ? '+' : '') + Math.round(trajectory.dropAdjustment.In(BC.Unit.MOA) * -1 * 10) / 10 + ''
    firstPage.drawRectangle({
      x: x - 8,
      y: y + 8,
      width: 3 + label.length * 6,
      height: 15,
      borderColor: PDF_PRIMARY_COLOR,
      borderWidth: 1,
      color: rgb(1, 1, 1),
      opacity: 0.75
    })
    firstPage.drawText(label, {
      x: x - 6,
      y: y + 11,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })

    // 200m light wind
    trajectory = shot25Wind8._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === distance)
    x = (initialX - Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * 10) / 10 + ''
    firstPage.drawRectangle({
      x: x - 30,
      y: y - 8,
      width: 3 + label.length * 6,
      height: 15,
      borderColor: PDF_PRIMARY_COLOR,
      borderWidth: 1,
      color: rgb(1, 1, 1),
      opacity: 0.75
    })
    firstPage.drawText(label, {
      x: x - 28,
      y: y - 4,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })

    // 200m strong wind
    trajectory = shot25Wind20._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === distance)
    x = (initialX + Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * 10) / 10 + ''
    firstPage.drawRectangle({
      x: x + 8,
      y: y - 8,
      width: 3 + label.length * 6,
      height: 15,
      borderColor: PDF_PRIMARY_COLOR,
      borderWidth: 1,
      opacity: 0.75,
      color: rgb(1, 1, 1)
    })
    firstPage.drawText(label, {
      x: x + 10,
      y: y - 4,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })

    // 300m no wind
    distance = 300
    initialX = 4.51
    trajectory = shot25._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === distance)
    x = initialX / PDF_UNIT
    y = height - (GRAPH_INITIAL_Y + trajectory.dropAdjustment.In(BC.Unit.MOA) * GRAPH_XY_INC) / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = (trajectory.dropAdjustment.In(BC.Unit.MOA) < 0 ? '+' : '') + Math.round(trajectory.dropAdjustment.In(BC.Unit.MOA) * -1 * 10) / 10 + ''
    firstPage.drawRectangle({
      x: x + 8,
      y: y - 8,
      width: 3 + label.length * 6,
      height: 15,
      borderColor: PDF_PRIMARY_COLOR,
      borderWidth: 1,
      color: rgb(1, 1, 1),
      opacity: 0.75
    })
    label = (trajectory.dropAdjustment.In(BC.Unit.MOA) < 0 ? '+' : '') + Math.round(trajectory.dropAdjustment.In(BC.Unit.MOA) * -1 * 10) / 10 + ''
    firstPage.drawText(label, {
      x: x + 10,
      y: y - 4,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })

    // 300m light wind
    trajectory = shot25Wind8._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === distance)
    x = (initialX - Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * 10) / 10 + ''
    firstPage.drawRectangle({
      x: x - 30,
      y: y - 8,
      width: 3 + label.length * 6,
      height: 15,
      borderColor: PDF_PRIMARY_COLOR,
      borderWidth: 1,
      color: rgb(1, 1, 1),
      opacity: 0.75
    })
    firstPage.drawText(label, {
      x: x - 28,
      y: y - 4,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })

    // 300m strong wind
    trajectory = shot25Wind20._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === distance)
    x = (initialX + Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * 10) / 10 + ''
    firstPage.drawRectangle({
      x: x + 8,
      y: y - 8,
      width: 3 + label.length * 6,
      height: 15,
      borderColor: PDF_PRIMARY_COLOR,
      borderWidth: 1,
      opacity: 0.75,
      color: rgb(1, 1, 1)
    })
    firstPage.drawText(label, {
      x: x + 10,
      y: y - 4,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })

    // 400m no wind
    distance = 400
    initialX = 7.01
    trajectory = shot25._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === distance)
    x = initialX / PDF_UNIT
    y = height - (GRAPH_INITIAL_Y + trajectory.dropAdjustment.In(BC.Unit.MOA) * GRAPH_XY_INC) / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = (trajectory.dropAdjustment.In(BC.Unit.MOA) < 0 ? '+' : '') + Math.round(trajectory.dropAdjustment.In(BC.Unit.MOA) * -1 * 10) / 10 + ''
    firstPage.drawRectangle({
      x: x + 8,
      y: y - 8,
      width: 3 + label.length * 6,
      height: 15,
      borderColor: PDF_PRIMARY_COLOR,
      borderWidth: 1,
      color: rgb(1, 1, 1),
      opacity: 0.75
    })
    firstPage.drawText(label, {
      x: x + 10,
      y: y - 4,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })

    // 400m light wind
    trajectory = shot25Wind8._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === distance)
    x = (initialX - Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * 10) / 10 + ''
    firstPage.drawRectangle({
      x: x - 30,
      y: y - 8,
      width: 3 + label.length * 6,
      height: 15,
      borderColor: PDF_PRIMARY_COLOR,
      borderWidth: 1,
      color: rgb(1, 1, 1),
      opacity: 0.75
    })
    firstPage.drawText(label, {
      x: x - 28,
      y: y - 4,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })

    // 400m strong wind
    trajectory = shot25Wind20._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === distance)
    x = (initialX + Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * 10) / 10 + ''
    firstPage.drawRectangle({
      x: x + 8,
      y: y - 8,
      width: 3 + label.length * 6,
      height: 15,
      borderColor: PDF_PRIMARY_COLOR,
      borderWidth: 1,
      opacity: 0.75,
      color: rgb(1, 1, 1)
    })
    firstPage.drawText(label, {
      x: x + 10,
      y: y - 4,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })

    // 500m no wind
    distance = 500
    initialX = 9.51
    trajectory = shot25._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === distance)
    x = initialX / PDF_UNIT
    y = height - (GRAPH_INITIAL_Y + trajectory.dropAdjustment.In(BC.Unit.MOA) * GRAPH_XY_INC) / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = (trajectory.dropAdjustment.In(BC.Unit.MOA) < 0 ? '+' : '') + Math.round(trajectory.dropAdjustment.In(BC.Unit.MOA) * -1 * 10) / 10 + ''
    firstPage.drawRectangle({
      x: x + 8,
      y: y - 8,
      width: 3 + label.length * 6,
      height: 15,
      borderColor: PDF_PRIMARY_COLOR,
      borderWidth: 1,
      color: rgb(1, 1, 1),
      opacity: 0.75
    })
    firstPage.drawText(label, {
      x: x + 10,
      y: y - 4,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })

    // 500m light wind
    trajectory = shot25Wind8._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === distance)
    x = (initialX - Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * 10) / 10 + ''
    firstPage.drawRectangle({
      x: x - 30,
      y: y - 8,
      width: 3 + label.length * 6,
      height: 15,
      borderColor: PDF_PRIMARY_COLOR,
      borderWidth: 1,
      color: rgb(1, 1, 1),
      opacity: 0.75
    })
    firstPage.drawText(label, {
      x: x - 28,
      y: y - 4,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })

    // 500m strong wind
    trajectory = shot25Wind20._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Yard)) === distance)
    x = (initialX + Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MOA)) * 10) / 10 + ''
    firstPage.drawRectangle({
      x: x + 8,
      y: y - 8,
      width: 3 + label.length * 6,
      height: 15,
      borderColor: PDF_PRIMARY_COLOR,
      borderWidth: 1,
      opacity: 0.75,
      color: rgb(1, 1, 1)
    })
    firstPage.drawText(label, {
      x: x + 10,
      y: y - 4,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })
  }
}

async function loadPDF (url) {
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(existingPdfBytes)

  return pdfDoc
}
