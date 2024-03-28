<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <div class="row justify-between">
      <div class="col-auto text-h6">
        Velocity Chart
      </div>
      <div class="col-auto text-h6">
        Speed of Sound: {{ machValueLabel }}
      </div>
    </div>
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
    id: 'velocity-chart',
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
  colors: [colors.getPaletteColor('primary'), colors.getPaletteColor('accent')],
  theme: {
    mode: $q.dark.isActive ? 'dark' : 'light'
  },
  yaxis: {
    title: {
      style: {
        fontSize: '1em'
      },
      offsetX: -10
    }
  },
  xaxis: {
    title: {
      style: {
        fontSize: '1em'
      },
      offsetY: -10
    }
  },
  tooltip: {
    enabledOnSeries: [0]
  }
}

// calculate trajectory
const ballisticStore = useBallisticStore()
const results = computed(() => ballisticStore.calculateTrajectory)
const speedOfSound = results.value.shot.atmo.mach
const machValueLabel = ref('')

// Chart series data
let series = reactive([])

const buildSeries = () => {
  const velocityData = []
  const speedOfSoundData = []
  let velocitySerieName
  let speedOfSoundSerieName
  let xAxisTitle
  let yAxisTitle

  const range = computed(() => ballisticStore.range)

  for (const trajectory of results.value._trajectory) {
    if (range.value.unit === 'YD') {
      let velocity = trajectory.velocity.In(BC.Unit.FPS)
      velocity = Math.round(velocity)

      let distance = trajectory.distance.In(BC.Unit.Yard)
      distance = Math.round(distance)
      velocityData.push({
        x: distance,
        y: velocity
      })

      speedOfSoundData.push({
        x: distance,
        y: Math.round(speedOfSound.In(BC.Unit.FPS))
      })

      // labels
      velocitySerieName = 'Velocity (FPS)'
      speedOfSoundSerieName = 'Speed of Sound (FPS)'
      machValueLabel.value = Math.round(speedOfSound.In(BC.Unit.FPS)) + ' FPS'
      xAxisTitle = 'RANGE (YD)'
      yAxisTitle = 'VELOCITY (FPS)'
    }
    if (range.value.unit === 'M') {
      let velocity = trajectory.velocity.In(BC.Unit.MPS)
      velocity = Math.round(velocity * 10) / 10

      let distance = trajectory.distance.In(BC.Unit.Meter)
      distance = Math.round(distance)
      velocityData.push({
        x: distance,
        y: velocity
      })

      speedOfSoundData.push({
        x: distance,
        y: Math.round(speedOfSound.In(BC.Unit.MPS))
      })
      // labels
      velocitySerieName = 'Velocity (MPS)'
      speedOfSoundSerieName = 'Speed of Sound (MPS)'
      machValueLabel.value = Math.round(speedOfSound.In(BC.Unit.MPS)) + ' MPS'
      xAxisTitle = 'RANGE (M)'
      yAxisTitle = 'VELOCITY (MPS)'
    }
  }

  // set correct legend
  options.xaxis.title.text = xAxisTitle
  options.yaxis.title.text = yAxisTitle

  // renew the data
  series = [{
    name: velocitySerieName,
    data: velocityData
  },
  {
    name: speedOfSoundSerieName,
    data: speedOfSoundData
  }]

  if (chart.value) { // chart may be null if not mounted
    chart.value.updateSeries(series)
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
