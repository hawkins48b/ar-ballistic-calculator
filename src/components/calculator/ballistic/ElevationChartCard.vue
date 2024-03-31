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
      ref="chart"
      type="line"
      :options="options"
      :series="series"
      height="300px"
    />
  </q-card>
</template>

<script setup>
// imports
import { useBallisticStore } from 'stores/ballistic'
import * as BC from 'js-ballistics'
import { ref, computed, reactive, watch } from 'vue'
import { colors, useQuasar } from 'quasar'

// the chart ref
const chart = ref(null)

// quasar $q
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
  yaxis: [{

    title: {
      style: {
        fontSize: '1em'
      },
      offsetX: -10,
      text: ''
    }
  }
  ],
  xaxis: {
    title: {
      style: {
        fontSize: '1em'
      },
      offsetY: -10,
      text: ''
    }
  }
}

// calculate trajectory
const ballisticStore = useBallisticStore()
const results = computed(() => ballisticStore.calculateTrajectory)
// Chart series data
let series = reactive([])

const buildSeries = () => {
  const data = []
  let serieName
  let xAxisTitle
  let yAxisTitle

  const range = computed(() => ballisticStore.range)

  for (const trajectory of results.value._trajectory) {
    if (range.value.unit === 'YD') {
      let elevation = trajectory.drop.In(BC.Unit.Inch)
      if (elevation < 100) {
        elevation = Math.round(elevation * 10) / 10
      } else {
        elevation = Math.round(elevation)
      }

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

  // set correct legend
  options.xaxis.title.text = xAxisTitle
  options.yaxis[0].title.text = yAxisTitle

  // renew the data
  series = [{
    name: serieName,
    data
  }]

  if (chart.value) { // chart may be null if not mounted
    chart.value.updateSeries(series)
    chart.value.updateOptions(options)
  }
}

watch(() => results, () => {
  buildSeries()
},
{
  deep: true,
  immediate: true
})
</script>
