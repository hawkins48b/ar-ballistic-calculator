<template>
  <zroCard>
    <q-card-section>
      <div class="text-h6">
        <q-icon
          name="query_stats"
          size="lg"
          class="q-mr-sm"
        />
        Comparison
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div
        v-show="!calcError"
      >
        <ValidationList
          :new-velocity="newVelocity"
        />
        <apexchart
          ref="chart"
          type="line"
          :options="options"
          :series="series"
          height="400px"
        />
        <validationButton
          :new-velocity="newVelocity"
        />
      </div>
      <div
        v-show="calcError"
        class="q-mt-md text-center"
      >
        <q-icon
          name="error"
          size="xl"
        />
        <p class="text-h6">
          The trajectory cannot be calculated.
        </p>
      </div>
    </q-card-section>
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
import ValidationList from 'components/calculators/trajectory-validation/ValidationList.vue'
import ValidationButton from 'components/calculators/trajectory-validation/ValidationButton.vue'
import { useTrajectoryValidationStore } from 'stores/trajectoryValidation'
import { ref, reactive, watch } from 'vue'
import { colors, useQuasar } from 'quasar'
import * as BC from 'js-ballistics'

// quasar $q
const $q = useQuasar()

// the chart ref
const chart = ref(null)

// set trajectory validation store
const trajectoryValidationStore = useTrajectoryValidationStore()

// calculation error
const calcError = ref(false)

/*
 * Chart options
 */
const options = reactive({
  chart: {
    id: 'trajectory-validation-chart',
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
  colors: [colors.getPaletteColor('accent'), colors.getPaletteColor('primary')],
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
 * Set options
 */
const setOptions = () => {
  let xAxisTitle, yAxisTitle
  if (trajectoryValidationStore.settings.range.unit === 'YD') {
    // labels
    xAxisTitle = 'RANGE (YD)'
  }
  if (trajectoryValidationStore.settings.range.unit === 'M') {
    // labels
    xAxisTitle = 'RANGE (M)'
  }
  if (trajectoryValidationStore.settings.measures.type === 'angle') {
    if (trajectoryValidationStore.settings.measures.angleUnit === 'MOA') {
    // labels
      yAxisTitle = 'ELEVATION (MOA)'
    }
    if (trajectoryValidationStore.settings.measures.angleUnit === 'MRAD') {
    // labels
      yAxisTitle = 'ELEVATION (MRAD)'
    }
  }

  if (trajectoryValidationStore.settings.measures.type === 'distance') {
    if (trajectoryValidationStore.settings.measures.distanceUnit === 'IN') {
      // labels
      yAxisTitle = 'ELEVATION (IN)'
    }
    if (trajectoryValidationStore.settings.measures.distanceUnit === 'CM') {
      // labels
      yAxisTitle = 'ELEVATION (CM)'
    }
  }

  // set correct legend
  options.xaxis.title.text = xAxisTitle
  options.yaxis[0].title.text = yAxisTitle

  options.xaxis.tickAmount = 20 - 1

  // ensure chart theme
  options.theme.mode = $q.dark.isActive ? 'dark' : 'light'

  if (chart.value) { // chart may be null if not mounted
    chart.value.updateOptions(options)
  }
}

/*
 * Chart series (data)
 */
const series = ref([])
const buildSeries = () => {
  if (trajectoryValidationStore.settings.measures.type === 'angle') {
    buildSeriesForAngle()
  }
  if (trajectoryValidationStore.settings.measures.type === 'distance') {
    buildSeriesForDistance()
  }
}
const buildSeriesForAngle = () => {
  series.value = []
  let data = []
  let serieName

  // initial trajectory
  for (const trajectory of initShot.value._trajectory) {
    const dropAdjustment = Math.round(trajectory.dropAdjustment.In(trajectoryValidationStore.measuresAngleUnit) * 100) / 100

    if (trajectoryValidationStore.measuresAngleUnit === BC.Unit.MOA) {
      serieName = 'Initial Elevation (MOA)'
    }
    if (trajectoryValidationStore.measuresAngleUnit === BC.Unit.MRad) {
      serieName = 'Initial Elevation (MRAD)'
    }

    let distance = trajectory.distance.In(trajectoryValidationStore.rangeDistanceUnit)
    if (distance >= trajectoryValidationStore.getZero.distance) {
      distance = Math.round(distance)
      data.push({
        x: distance,
        y: dropAdjustment
      })
    }
  }
  // add data to chart series
  series.value.push({
    name: serieName,
    data
  })

  // data for new validated trajectory
  data = []
  if (validShot.value) {
    for (const trajectory of validShot.value._trajectory) {
      const dropAdjustment = Math.round(trajectory.dropAdjustment.In(trajectoryValidationStore.measuresAngleUnit) * 100) / 100

      if (trajectoryValidationStore.measuresAngleUnit === BC.Unit.MOA) {
        serieName = 'Validated Elevation (MOA)'
      }
      if (trajectoryValidationStore.measuresAngleUnit === BC.Unit.MRad) {
        serieName = 'Validated Elevation (MRAD)'
      }

      let distance = trajectory.distance.In(trajectoryValidationStore.rangeDistanceUnit)

      if (distance >= trajectoryValidationStore.getZero.distance) {
        distance = Math.round(distance)
        data.push({
          x: distance,
          y: dropAdjustment
        })
      }
    }

    // add data to chart series
    series.value.push({
      name: serieName,
      data
    })
  }
}
const buildSeriesForDistance = () => {
  series.value = []
  let data = []
  let serieName

  // initial trajectory
  for (const trajectory of initShot.value._trajectory) {
    const elevation = Math.round(trajectory.drop.In(trajectoryValidationStore.measuresDistanceUnit) * 100) / 100

    if (trajectoryValidationStore.measuresDistanceUnit === BC.Unit.Inch) {
      serieName = 'Initial Elevation (IN)'
    }
    if (trajectoryValidationStore.measuresDistanceUnit === BC.Unit.Centimeter) {
      serieName = 'Initial Elevation (CM)'
    }

    let distance = trajectory.distance.In(trajectoryValidationStore.rangeDistanceUnit)
    distance = Math.round(distance)
    data.push({
      x: distance,
      y: elevation
    })
  }
  // add data to chart series
  series.value.push({
    name: serieName,
    data
  })

  // data for new validated trajectory
  data = []
  if (validShot.value) {
    for (const trajectory of validShot.value._trajectory) {
      const elevation = Math.round(trajectory.drop.In(trajectoryValidationStore.measuresDistanceUnit) * 100) / 100

      if (trajectoryValidationStore.measuresDistanceUnit === BC.Unit.Inch) {
        serieName = 'Validated Elevation (IN)'
      }
      if (trajectoryValidationStore.measuresDistanceUnit === BC.Unit.Centimeter) {
        serieName = 'Validated Elevation (CM)'
      }

      let distance = trajectory.distance.In(trajectoryValidationStore.rangeDistanceUnit)
      distance = Math.round(distance)
      data.push({
        x: distance,
        y: elevation
      })
    }

    // add data to chart series
    series.value.push({
      name: serieName,
      data
    })
  }
}

const validShot = ref()
const initShot = ref()
const newVelocity = ref()
watch(() => trajectoryValidationStore, () => {
  if (trajectoryValidationStore.profileId && trajectoryValidationStore.isCalculationValid) {
    const {
      initialShot,
      validationShot,
      velocity
    } = trajectoryValidationStore.calculatTrajectoryValidation()

    if (validationShot) {
      validShot.value = validationShot
      initShot.value = initialShot
      newVelocity.value = Math.round(velocity)
      // build series
      buildSeries()
      // set options
      setOptions()
      // no error
      calcError.value = false
    } else {
      calcError.value = true
    }
  } else {
    calcError.value = true
  }
},
{
  immediate: true,
  deep: true
})

/*
 * update chart if theme changes
 */
watch(() => $q.dark.isActive, () => {
  setOptions()
})
</script>
