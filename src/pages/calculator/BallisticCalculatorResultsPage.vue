<template>
  <q-page>
    <!-- content -->
    <div class="row justify-start q-mb-md q-ml-sm">
      <q-btn
        outline
        to="/calculator"
      >
        Back
      </q-btn>
      <div class="text-h6 q-ml-md">
        Results
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-6 q-pa-sm">
        <ProfileCard
          :profile="calcArgs.profile"
        />
      </div>
      <div class="col-xs-12 col-md-6 q-pa-sm">
        <BallisticCalculatorArgsCard />
      </div>
    </div>
    <ElevationChart
      class="q-ml-sm q-mt-sm"
    />
    <ExportButton color="primary q-mt-md q-ml-sm" />
    <ElevationTable
      class="q-ml-sm q-mt-md"
    />
  </q-page>
</template>

<script>
import ProfileCard from 'components/profiles/view/ProfileCard.vue'
import BallisticCalculatorArgsCard from 'components/calculator/results/BallisticCalculatorArgsCard.vue'
import ExportButton from 'components/calculator/results/ExportButton.vue'
import ElevationChart from 'components/calculator/results/ElevationChart.vue'
import ElevationTable from 'components/calculator/results/ElevationTable.vue'
import { LocalStorage } from 'quasar'

import * as BC from 'js-ballistics'
import Calculator from 'js-ballistics'

export default {
  components: {
    ProfileCard,
    BallisticCalculatorArgsCard,
    ExportButton,
    ElevationChart,
    ElevationTable
  },
  data: function () {
    return {
      calcArgs: JSON.parse(LocalStorage.getItem('bc-args'))
    }
  },
  mounted () {
    // Create a Measure object (example)
    const exampleMeasure = BC.UNew.Meter(10)
    const exampleMeasureFoot = exampleMeasure.to(BC.Unit.Foot)
    const exampleValueFoot = exampleMeasure.In(BC.Unit.Foot)

    // Log the Measure object to the console
    console.log('Example Measure in meter:', `${exampleMeasure}`)
    console.log('Example Conversion meter to foot:', `${exampleMeasureFoot}`)
    console.log('Example Conversion meter to number in foot:', `${exampleValueFoot}`)

    // BC.calcSettings.USE_POWDER_SENSITIVITY = true

    // define ammo parameter
    const bulletWeight = BC.UNew.Grain(63)
    const bulletDiameter = BC.UNew.Millimeter(5.56)
    const ballisticCoefficient = 0.331
    const dragModel = new BC.DragModel(ballisticCoefficient, BC.Table.G1, bulletWeight, bulletDiameter)

    const Velocitydistance = BC.UNew.Yard(2)
    const bulletVelocity = BC.UNew.FPS(2700)
    const opticHeight = BC.UNew.Inch(3.5)
    const weapon = new BC.Weapon(opticHeight)
    const ammo = new BC.Ammo(dragModel, Velocitydistance, bulletVelocity)
    const atmo = new BC.Atmo()

    const maxRange = BC.UNew.Yard(500)
    const rangeStep = BC.UNew.Yard(25)
    const zeroAngle = BC.UNew.Radian(0)
    const relativeAngle = BC.UNew.Radian(0)
    const cantAngle = BC.UNew.Radian(0)

    const shot = new BC.Shot(maxRange, zeroAngle, relativeAngle, cantAngle, atmo)
    const calculator = new Calculator(weapon, ammo, atmo)
    const results = calculator.fire(shot, rangeStep)
    // const zeroAngle = new BC.UNew.

    console.log(results)
  }
}
</script>
