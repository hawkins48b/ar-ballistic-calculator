<template>
  <q-card
    v-show="mpbrShot"
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <p class="text-h6">
      MPBR Chart
    </p>
    <MpbrList
      :shot="mpbrShot"
    />
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
import MpbrList from 'components/calculator/mpbr/MpbrList.vue'
import * as BC from 'js-ballistics'
import { ref, reactive, computed, watch } from 'vue'
import { colors, useQuasar } from 'quasar'
import { useMpbrStore } from 'stores/mpbr'

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
    curve: 'smooth'
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
    },
    forceNiceScale: true
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
  },
  annotations: {
    yaxis: [
      {
        y: 0,
        label: {
          text: 'Sight line',
          borderColor: 'transparent',
          style: {
            background: colors.getPaletteColor('grey-9'),
            color: '#fff'
          }
        },
        strokeDashArray: 0,
        borderColor: colors.getPaletteColor('grey-9')
      },
      {
        label: {
          text: 'Target limit',
          borderColor: 'transparent',
          style: {
            background: colors.getPaletteColor('accent'),
            color: '#fff'
          }
        },
        strokeDashArray: 0,
        borderColor: colors.getPaletteColor('accent')
      },
      {
        label: {
          text: 'Target limit',
          borderColor: 'transparent',
          style: {
            background: colors.getPaletteColor('accent'),
            color: '#fff'
          }
        },
        strokeDashArray: 0,
        borderColor: colors.getPaletteColor('accent')
      }
    ]
  }
})

// Chart series data
const series = ref([])

const buildSeries = () => {
  const data = []
  let serieName
  let xAxisTitle
  let yAxisTitle

  const unit = computed(() => mpbrStore.target.unit)
  console.log('start build serie')
  for (const trajectory of mpbrShot.value._trajectory) {
    if (unit.value === 'IN') {
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
    if (unit.value === 'CM') {
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

  // adjust data & axis
  options.xaxis.max = mpbrShot.value.distanceMax - mpbrShot.value.distanceMax % 100 + 100
  options.xaxis.tickAmount = 20

  const xAxisLimit = mpbrStore.target.size / 2 - mpbrStore.target.size / 2 % 10 + 10
  options.yaxis[0].min = -xAxisLimit
  options.yaxis[0].max = xAxisLimit
  options.yaxis[0].tickAmount = 5

  // adjust annotations
  options.annotations.yaxis[1].y = mpbrStore.target.size / 2
  options.annotations.yaxis[2].y = -mpbrStore.target.size / 2

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

// mpbr store
const mpbrStore = useMpbrStore()
// load series by watching shot
const mpbrShot = ref()

// watch if data changes
watch(mpbrStore, async () => {
  if (mpbrStore.profileId && mpbrStore.target.size > 0) {
    // calculate maximum point blank range
    mpbrShot.value = await mpbrStore.calculateMpbr()
    buildSeries()
    console.log('new shot', mpbrShot.value)
    console.log('new series', series.value)
  }
},
{
  immediate: true,
  deep: true
})

</script>
