<template>
  <q-card
    v-show="mpbrShot"
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <div class="row justify-between">
      <div class="col-auto">
        <p class="text-h6">
          MPBR Chart
        </p>
      </div>
      <div class="col-auto">
        <q-toggle v-model="showAnnotations">
          Show Annotations
        </q-toggle>
      </div>
    </div>
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
    <!--
    <useMpbrButton
      :zero="zeroDistance"
      :distance-unit="mpbrStore.distanceUnit"
      :distance="xAxisMax"
    />
    -->
  </q-card>
</template>

<script setup>
// imports
import MpbrList from 'components/calculator/mpbr/MpbrList.vue'
// import UseMpbrButton from 'components/calculator/mpbr/UseMpbrButton.vue'
import * as BC from 'js-ballistics'
import { ref, reactive, computed, watch } from 'vue'
import { colors, useQuasar } from 'quasar'
import { useMpbrStore } from 'stores/mpbr'
import { storeToRefs } from 'pinia'

// the chart ref
const chart = ref(null)

// quasar $q
const $q = useQuasar()

// mpbr store
const mpbrStore = useMpbrStore()
const unit = computed(() => mpbrStore.target.unit)

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
  }
})

// Chart series data
const series = ref([])

const buildSeries = () => {
  const data = []
  let serieName
  let xAxisTitle
  let yAxisTitle

  for (const trajectory of mpbrShot.value._trajectory) {
    if (unit.value === 'IN') {
      const elevation = Math.round(trajectory.drop.In(BC.Unit.Inch) * 10) / 10

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

  const yAxisLimit = mpbrStore.target.size / 2 - mpbrStore.target.size / 2 % 10 + 10
  options.yaxis[0].min = -yAxisLimit
  options.yaxis[0].max = yAxisLimit
  options.yaxis[0].tickAmount = 5

  // renew the data
  series.value = [{
    name: serieName,
    data
  }]

  if (chart.value) { // chart may be null if not mounted
    chart.value.updateOptions(options)
  }
}

// load series by watching shot
const mpbrShot = ref()

// watch if data changes
watch(mpbrStore, async () => {
  if (mpbrStore.profileId && mpbrStore.target.size > 0) {
    // calculate maximum point blank range
    mpbrShot.value = await mpbrStore.calculateMpbr()
    // reduce results
    mpbrShot.value._trajectory = reduceShotTrajectories(mpbrShot.value)
    // build series
    buildSeries()
    // remove annotations
    showAnnotations.value = false
  }
},
{
  immediate: true,
  deep: true
})

const reduceShotTrajectories = (shot) => {
  const unit = computed(() => mpbrStore.target.unit)
  const yAxisMax = -(mpbrStore.target.size / 2 - mpbrStore.target.size / 2 % 10 + 10)
  let dropUnit
  if (unit.value === 'IN') {
    dropUnit = BC.Unit.Inch
  }
  if (unit.value === 'CM') {
    dropUnit = BC.Unit.Centimeter
  }
  return shot._trajectory.filter(trajectory => trajectory.drop.In(dropUnit) > yAxisMax)
}

/*
 * Annotations
 */
const showAnnotations = ref(false)
watch(showAnnotations, (newValue) => {
  toggleAnnotations(newValue)
})
const toggleAnnotations = (show) => {
  if (chart.value) {
    if (show) {
      chart.value.addYaxisAnnotation(annotationSightLine)
      chart.value.addYaxisAnnotation(annotationTargetSize.value)
    } else {
      chart.value.removeAnnotation(annotationSightLine.id)
      chart.value.removeAnnotation(annotationTargetSize.value.id)
    }
  }
}
const annotationSightLine = {
  id: 'sight-line',
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
}

const { target } = storeToRefs(mpbrStore)
const annotationTargetSize = computed(() => {
  return {
    id: 'target-size',
    y: -target.value.size / 2,
    y2: target.value.size / 2,
    label: {
      text: 'Target size',
      borderColor: 'transparent',
      style: {
        background: colors.getPaletteColor('accent'),
        color: '#fff'
      }
    },
    borderColor: colors.getPaletteColor('accent'),
    fillColor: colors.getPaletteColor('accent')
  }
})

</script>
