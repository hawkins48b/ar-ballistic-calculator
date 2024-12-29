<template>
  <zroCard>
    <q-card-section>
      <div class="row justify-between">
        <div class="col-auto">
          <div class="text-h6">
            <q-icon
              name="stacked_line_chart"
              size="lg"
              class="q-mr-sm"
            />
            Velocity chart
          </div>
        </div>
        <div class="col-auto text-h6">
          Speed of Sound: {{ speedOfSound }}
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <apexchart
        ref="chart"
        type="line"
        :options="options"
        :series="series"
        height="300px"
      />
    </q-card-section>
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
import { useBallisticStore } from 'stores/ballistic'
import { ref, computed } from 'vue'
import { colors, useQuasar } from 'quasar'

// the chart ref
const chart = ref(null)

// quasar $q
const $q = useQuasar()

// ballistic store
const ballisticStore = useBallisticStore()

// chart options
const options = computed(() => {
  return {
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
      },
      tickAmount: ballisticStore.range.distance / ballisticStore.range.step - 1
    },
    tooltip: {
      enabledOnSeries: [0]
    }
  }
})

// calculate trajectory
const speedOfSound = computed(() => {
  const results = ballisticStore.calculateShot

  const label = Math.round(results.shot.atmo.mach.In(ballisticStore.VelocityUnit)) + ' ' + ballisticStore.VelocityLabel

  return label
})

// Chart series data

const series = computed(() => {
  const results = ballisticStore.calculateShotStep1

  const data = []

  const speedOfSound = Math.round(results.shot.atmo.mach.In(ballisticStore.VelocityUnit))
  const speedOfSoundData = []
  const velocityData = []
  results._trajectory.forEach(trajectory => {
    const distance = Math.round(trajectory.distance.In(ballisticStore.distanceUnit))
    const velocity = Math.round(trajectory.velocity.In(ballisticStore.VelocityUnit))

    velocityData.push({
      x: distance,
      y: velocity
    })

    speedOfSoundData.push({
      x: distance,
      y: speedOfSound
    })
  })

  data.push({
    name: `Velocity (${ballisticStore.VelocityLabel})`,
    data: velocityData
  })
  data.push({
    name: `Speed of Sound (${ballisticStore.VelocityLabel})`,
    data: speedOfSoundData
  })

  return data
})
</script>
