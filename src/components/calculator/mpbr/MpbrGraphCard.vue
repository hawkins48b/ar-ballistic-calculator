<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <p class="text-h6">
      MPRBR Chart
    </p>
    <apexchart
      ref="chart"
      type="line"
      :options="options"
      :series="series"
      height="300px"
    />

    <q-inner-loading
      :showing="loading"
      color="primary"
    />
  </q-card>
</template>

<script setup>
// imports
import { useMpbrStore } from 'stores/mpbr'
import * as BC from 'js-ballistics'
import { ref, reactive, computed, watch } from 'vue'
import { colors, useQuasar } from 'quasar'

// the chart ref
const chart = ref(null)

// quasar $q
const $q = useQuasar()

// chart options
const options = reactive({
  chart: {
    id: 'mpbr-chart',
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
})

// loader
const loading = ref(false)

// calculate trajectory
const mpbrStore = useMpbrStore()
const mpbrShot = ref()

// watch if data changes
watch(mpbrStore, async () => {
  loading.value = true
  console.log('show loader', loading.value)
  mpbrShot.value = await mpbrStore.calculateMpbr()
  buildSeries()
  loading.value = false
  console.log('show loader', loading.value)
},
{
  deep: true,
  immediate: true
})

// Chart series data
const series = ref([])

const buildSeries = () => {
  const data = []
  let serieName
  let xAxisTitle
  let yAxisTitle

  const unit = computed(() => mpbrStore.target.unit)

  for (const trajectory of mpbrShot.value._trajectory) {
    if (unit.value) {
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
    if (unit.value === 'M') {
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
  series.value = [{
    name: serieName,
    data
  }]

  if (chart.value) { // chart may be null if not mounted
    // chart.value.refresh()
    chart.value.updateOptions(options)
  }
}
</script>
