<template>
  <zroCard
    v-show="mpbrShot"
  >
    <div class="row justify-between">
      <div class="col-auto">
        <div class="text-h6">
          <q-icon
            name="query_stats"
            size="lg"
            class="q-mr-sm"
          />
          MPBR chart
        </div>
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
      height="400px"
    />
    <useMpbrButton
      :shot="mpbrShot"
      :distance-unit="mpbrStore.distanceUnit"
    />
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
import MpbrList from 'components/calculators/mpbr/MpbrList.vue'
import UseMpbrButton from 'components/calculators/mpbr/UseMpbrButton.vue'
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

/*
 * Chart options
 */
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

/*
 * Chart series (data)
 */
const series = ref([])
const buildSeries = () => {
  const data = []
  let serieName

  for (const trajectory of mpbrShot.value._trajectory) {
    const elevation = Math.round(trajectory.drop.In(mpbrStore.elevationUnit) * 100) / 100

    if (mpbrStore.elevationUnit === BC.Unit.Inch) {
      serieName = 'Elevation (IN)'
    }
    if (mpbrStore.elevationUnit === BC.Unit.Centimeter) {
      serieName = 'Elevation (CM)'
    }

    let distance = trajectory.distance.In(mpbrStore.distanceUnit)
    distance = Math.round(distance)
    data.push({
      x: distance,
      y: elevation
    })
  }

  // renew the data
  series.value = [{
    name: serieName,
    data
  }]
}

/*
 * Set options
 */
const setOptions = () => {
  let xAxisTitle, yAxisTitle
  if (mpbrStore.distanceUnit === BC.Unit.Yard) {
    // labels
    xAxisTitle = 'RANGE (YD)'
  }
  if (mpbrStore.distanceUnit === BC.Unit.Meter) {
    // labels
    xAxisTitle = 'RANGE (M)'
  }
  if (mpbrStore.elevationUnit === BC.Unit.Inch) {
    // labels
    yAxisTitle = 'ELEVATION (IN)'
  }
  if (mpbrStore.elevationUnit === BC.Unit.Centimeter) {
    // labels
    yAxisTitle = 'ELEVATION (CM)'
  }

  // set correct legend
  options.xaxis.title.text = xAxisTitle
  options.yaxis[0].title.text = yAxisTitle

  // adjust data & axis
  options.xaxis.max = mpbrShot.value.mpbr.distanceMax.In(mpbrStore.distanceUnit) - mpbrShot.value.mpbr.distanceMax.In(mpbrStore.distanceUnit) % 100 + 100
  options.xaxis.tickAmount = 20

  // ensure chart theme
  options.theme.mode = $q.dark.isActive ? 'dark' : 'light'

  if (chart.value) { // chart may be null if not mounted
    chart.value.updateOptions(options)
  }
}

/*
 * Calculate shot
 */
const mpbrShot = ref()
// watch if data changes
watch(mpbrStore, async () => {
  if (mpbrStore.profileId && mpbrStore.target.size > 0) {
    // calculate maximum point blank range
    mpbrShot.value = await mpbrStore.calculateMpbr()

    if (mpbrShot.value) {
    // reduce results
      mpbrShot.value._trajectory = reduceShotTrajectories(mpbrShot.value)
      // build series
      buildSeries()
      // set options
      setOptions()
      // remove annotations
      showAnnotations.value = false
    }
  }
},
{
  immediate: true,
  deep: true
})

const reduceShotTrajectories = (shot) => {
  if (shot) {
    const xAxisMax = shot.mpbr.distanceMax.In(mpbrStore.distanceUnit) - shot.mpbr.distanceMax.In(mpbrStore.distanceUnit) % 100 + 100

    return shot._trajectory.filter(trajectory => trajectory.distance.In(mpbrStore.distanceUnit) <= xAxisMax)
  } else return null
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
      chart.value.addPointAnnotation(annotationNearZero.value)
      chart.value.addPointAnnotation(annotationFarZero.value)
      chart.value.addXaxisAnnotation(annotationMpbr.value)
      chart.value.addYaxisAnnotation(annotationTargetSize.value)
    } else {
      chart.value.removeAnnotation(annotationNearZero.value.id)
      chart.value.removeAnnotation(annotationFarZero.value.id)
      chart.value.removeAnnotation(annotationMpbr.value.id)
      chart.value.removeAnnotation(annotationTargetSize.value.id)
    }
  }
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
        color: '#fff',
        fontSize: '15px'
      }
    },
    borderColor: colors.getPaletteColor('accent'),
    fillColor: colors.getPaletteColor('accent')
  }
})
const annotationNearZero = computed(() => {
  return {
    id: 'near-zero-size',
    x: mpbrShot.value.nearZero.In(mpbrStore.distanceUnit),
    y: 0,
    label: {
      text: 'Near zero',
      borderColor: 'transparent',
      style: {
        background: colors.getPaletteColor('grey-9'),
        color: '#fff',
        fontSize: '15px'
      }
    },
    borderColor: colors.getPaletteColor('grey-9'),
    fillColor: colors.getPaletteColor('grey-9')
  }
})
const annotationFarZero = computed(() => {
  let x = -100 // default outside view
  if (mpbrShot.value.farZero) {
    x = mpbrShot.value.farZero.In(mpbrStore.distanceUnit)
  }
  return {
    id: 'far-zero-size',
    x,
    y: 0,
    label: {
      text: 'Far zero',
      borderColor: 'transparent',
      style: {
        background: colors.getPaletteColor('grey-9'),
        color: '#fff',
        fontSize: '15px'
      }
    },
    borderColor: colors.getPaletteColor('grey-9'),
    fillColor: colors.getPaletteColor('grey-9')
  }
})
const annotationMpbr = computed(() => {
  return {
    id: 'mpbr-min-size',
    x: mpbrShot.value.mpbr.distanceMin.In(mpbrStore.distanceUnit),
    x2: mpbrShot.value.mpbr.distanceMax.In(mpbrStore.distanceUnit),
    label: {
      text: 'Point blank range',
      borderColor: 'transparent',
      style: {
        background: colors.getPaletteColor('primary'),
        color: '#fff',
        fontSize: '15px'
      },
      textAnchor: 'top',
      position: 'end',
      orientation: 'horizontal',
      offsetX: 20,
      offsetY: -20
    },
    borderColor: colors.getPaletteColor('primary'),
    fillColor: colors.getPaletteColor('primary')
  }
})

/*
 * update chart if theme changes
 */
watch(() => $q.dark.isActive, () => {
  setOptions()
})
</script>
