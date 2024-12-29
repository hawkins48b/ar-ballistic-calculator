import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { useProfilesStore } from 'src/stores/profiles'
import * as BC from 'js-ballistics'
import ballisticCalculator from 'src/controller/ballistic-calculator'

const PDF_UNIT = 1 / 72
const PDF_URL_AR_DATASHEET_METRIC = '/pdf/rifle-dataset-metric.pdf'
const PDF_PRIMARY_COLOR = rgb(0.03529411764705882, 0.47843137254901963, 0.20392156862745098)

export default async function (profileId) {
  // load pdf
  const pdfDoc = await loadPDF(PDF_URL_AR_DATASHEET_METRIC)
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
      unit: 'M',
      step: 1
    },
    wind: {
      speed: 0,
      speedUnit: 'MPS',
      direction: 3,
      directionUnit: 'CLOCK'
    }
  }
  const shot1 = ballisticCalculator(shotParam, true)

  shotParam.range.step = 25
  const shot25 = ballisticCalculator(shotParam)

  shotParam.wind.speed = 3.5
  const shot25Wind3 = ballisticCalculator(shotParam)

  shotParam.wind.speed = 9
  const shot25Wind9 = ballisticCalculator(shotParam)

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
    if (profile.optic.zeroUnit === 'YD') {
      nearZero = Math.round(BC.UNew.Yard(nearZero).In(BC.Unit.Meter) * 10) / 10
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
    const trajectory25m = shot1._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === 25)
    const zero25m = (trajectory25m.drop.In(BC.Unit.Centimeter) > 0 ? '+' : '') + Math.round(trajectory25m.drop.In(BC.Unit.Centimeter) * 10) / 10 + ''
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
      const farZero = Math.round(shot1.farZero.In(BC.Unit.Meter) * 10) / 10 + ''
      firstPage.drawText(farZero, {
        x: 7.34 / PDF_UNIT,
        y: height - 0.97 / PDF_UNIT,
        size: 11,
        helveticaFont,
        color: PDF_PRIMARY_COLOR
      })
    }
    // 100m zero
    const trajectory100m = shot1._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === 100)
    const zero100m = (trajectory100m.drop.In(BC.Unit.Centimeter) > 0 ? '+' : '') + Math.round(trajectory100m.drop.In(BC.Unit.Centimeter) * 10) / 10 + ''
    firstPage.drawText(zero100m, {
      x: 9.32 / PDF_UNIT,
      y: height - 0.97 / PDF_UNIT,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })
    // height over bore
    let heightOverBore = profile.optic.height
    if (profile.optic.heightUnit === 'IN') {
      heightOverBore = Math.round(BC.UNew.Inch(heightOverBore).In(BC.Unit.Centimeter) * 10) / 10
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
    if (profile.measures.velocityUnit === 'FPS') {
      velocity = Math.round(BC.UNew.FPS(profile.measures.velocity).In(BC.Unit.MPS) * 10) / 10
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
    const GRAPH_START_Y = 2.04
    const GRAPH_X_INC = 8.88 / 500
    const GRAPH_Y_INC = 3.72 / 350

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
      x = (trajectory.distance.In(BC.Unit.Meter) * GRAPH_X_INC + GRAPH_START_X) / PDF_UNIT
      y = height - (GRAPH_START_Y + trajectory.drop.In(BC.Unit.Centimeter) * -1 * GRAPH_Y_INC) / PDF_UNIT

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
      const label = (trajectory.drop.In(BC.Unit.Centimeter) > 0 ? '+' : '') + Math.round(trajectory.drop.In(BC.Unit.Centimeter) * 10) / 10 + ''
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
    const GRAPH_INITIAL_Y = 7.15
    const GRAPH_XY_INC = 1.98 / 10
    let initialX
    let x
    let y
    let distance
    let trajectory
    let label
    // 200m no wind
    distance = 200
    initialX = 1.95
    trajectory = shot25._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === distance)
    x = initialX / PDF_UNIT
    y = height - (GRAPH_INITIAL_Y + trajectory.dropAdjustment.In(BC.Unit.MRad) * GRAPH_XY_INC) / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = (trajectory.dropAdjustment.In(BC.Unit.MRad) < 0 ? '+' : '') + Math.round(trajectory.dropAdjustment.In(BC.Unit.MRad) * -1 * 10) / 10 + ''
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
    trajectory = shot25Wind3._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === distance)
    x = (initialX - Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * 10) / 10 + ''
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
    trajectory = shot25Wind9._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === distance)
    x = (initialX + Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * 10) / 10 + ''
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
    initialX = 4.53
    trajectory = shot25._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === distance)
    x = initialX / PDF_UNIT
    y = height - (GRAPH_INITIAL_Y + trajectory.dropAdjustment.In(BC.Unit.MRad) * GRAPH_XY_INC) / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = (trajectory.dropAdjustment.In(BC.Unit.MRad) < 0 ? '+' : '') + Math.round(trajectory.dropAdjustment.In(BC.Unit.MRad) * -1 * 10) / 10 + ''
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
    label = (trajectory.dropAdjustment.In(BC.Unit.MRad) < 0 ? '+' : '') + Math.round(trajectory.dropAdjustment.In(BC.Unit.MRad) * -1 * 10) / 10 + ''
    firstPage.drawText(label, {
      x: x + 10,
      y: y - 4,
      size: 11,
      helveticaFont,
      color: PDF_PRIMARY_COLOR
    })

    // 300m light wind
    trajectory = shot25Wind3._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === distance)
    x = (initialX - Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * 10) / 10 + ''
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
    trajectory = shot25Wind9._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === distance)
    x = (initialX + Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * 10) / 10 + ''
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
    initialX = 7.12
    trajectory = shot25._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === distance)
    x = initialX / PDF_UNIT
    y = height - (GRAPH_INITIAL_Y + trajectory.dropAdjustment.In(BC.Unit.MRad) * GRAPH_XY_INC) / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = (trajectory.dropAdjustment.In(BC.Unit.MRad) < 0 ? '+' : '') + Math.round(trajectory.dropAdjustment.In(BC.Unit.MRad) * -1 * 10) / 10 + ''
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
    trajectory = shot25Wind3._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === distance)
    x = (initialX - Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * 10) / 10 + ''
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
    trajectory = shot25Wind9._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === distance)
    x = (initialX + Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * 10) / 10 + ''
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
    initialX = 9.7
    trajectory = shot25._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === distance)
    x = initialX / PDF_UNIT
    y = height - (GRAPH_INITIAL_Y + trajectory.dropAdjustment.In(BC.Unit.MRad) * GRAPH_XY_INC) / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = (trajectory.dropAdjustment.In(BC.Unit.MRad) < 0 ? '+' : '') + Math.round(trajectory.dropAdjustment.In(BC.Unit.MRad) * -1 * 10) / 10 + ''
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
    trajectory = shot25Wind3._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === distance)
    x = (initialX - Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * 10) / 10 + ''
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
    trajectory = shot25Wind9._trajectory.find((trajectory) => Math.round(trajectory.distance.In(BC.Unit.Meter)) === distance)
    x = (initialX + Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * GRAPH_XY_INC) / PDF_UNIT
    y = height - GRAPH_INITIAL_Y / PDF_UNIT
    firstPage.drawCircle({
      x,
      y,
      size: 3,
      borderWidth: 0,
      color: PDF_PRIMARY_COLOR
    })
    label = Math.round(Math.abs(trajectory.windageAdjustment.In(BC.Unit.MRad)) * 10) / 10 + ''
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
