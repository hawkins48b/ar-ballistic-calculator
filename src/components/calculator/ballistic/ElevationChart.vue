<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <p class="text-h6">
      Elevation Chart
    </p>
    <apexchart
      type="line"
      :options="options"
      :series="series"
      height="300px"
    />
  </q-card>
</template>

<script setup>
// imports
import { useCalculatorStore } from 'stores/calculator'
import * as BC from 'js-ballistics'
import { computed } from 'vue'
import { colors, useQuasar } from 'quasar'

const $q = useQuasar()
// chart options
const options = {
  chart: {
    id: 'elevation-chart',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    fontFamily: 'Mallanna, sans-serif',
    background: 'transparent'
  },
  stroke: {
    curve: 'straight'
  },
  colors: [colors.getPaletteColor('primary')],
  theme: {
    mode: $q.dark.isActive ? 'dark' : 'light'
  },
  yaxis: {
    title: {
      style: {
        fontSize: '1em'
      },
      offsetX: -20
    }
  },
  xaxis: {
    title: {
      style: {
        fontSize: '1em'
      },
      offsetY: -10
    }
  }
}

// calculate trajectory
const calculatorStore = useCalculatorStore()
const results = calculatorStore.calculateTrajectory

// build serie
const data = []
let serieName
let xAxisTitle
let yAxisTitle

const range = computed(() => calculatorStore.range)

for (const trajectory of results._trajectory) {
  if (range.value.unit === 'YD') {
    let elevation = trajectory.drop.In(BC.Unit.Inch)
    elevation = Math.round(elevation * 10) / 10

    let distance = trajectory.distance.In(BC.Unit.Yard)
    distance = Math.round(distance)
    data.push({
      x: distance,
      y: elevation
    })
    // labels
    serieName = 'Elevation (IN)'
    xAxisTitle = 'RANGE (YD)'
    yAxisTitle = 'ELEVATION (IN)'
  }
  if (range.value.unit === 'M') {
    let elevation = trajectory.drop.In(BC.Unit.Centimeter)
    elevation = Math.round(elevation * 10) / 10

    let distance = trajectory.distance.In(BC.Unit.Meter)
    distance = Math.round(distance)
    data.push({
      x: distance,
      y: elevation
    })
    // labels
    serieName = 'Elevation (CM)'
    xAxisTitle = 'RANGE (M)'
    yAxisTitle = 'ELEVATION (CM)'
  }
}

const series = [{
  name: serieName,
  data
}]

// set correct legend
options.xaxis.title.text = xAxisTitle
options.yaxis.title.text = yAxisTitle

</script>
