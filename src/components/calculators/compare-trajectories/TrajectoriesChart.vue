<template>
  <q-card
    v-if="series.length > 0"
  >
    <q-card-section>
      <div class="row justify-between">
        <div class="col-auto">
          <div class="text-h6">
            <q-icon
              name="query_stats"
              size="lg"
              class="q-mr-sm"
            />
            Trajectories chart
          </div>
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
  </q-card>
</template>

<script setup>
import { useTrajectoriesStore } from 'stores/trajectories'
import { computed } from 'vue'
import { colors, useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import * as BC from 'js-ballistics'

const trajectoriesStore = useTrajectoriesStore()
const { trajectories, range } = storeToRefs(trajectoriesStore)

// quasar $q
const $q = useQuasar()

const options = computed(function () {
  return {
    chart: {
      id: 'trajectores-chart',
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
    colors: [colors.getPaletteColor('primary'), colors.getPaletteColor('accent'), '#3498db', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6'],
    theme: {
      mode: $q.dark.isActive ? 'dark' : 'light'
    },
    yaxis: [{
      title: {
        style: {
          fontSize: '1em'
        },
        offsetX: -10,
        text: yAxisTitle()
      }
    }
    ],
    xaxis: {
      title: {
        style: {
          fontSize: '1em'
        },
        offsetY: -10,
        text: xAxisTitle()
      },
      type: 'numeric',
      tickAmount: tickAmount()
    }
  }
})

const xAxisTitle = function () {
  let title

  if (range.value.unit === 'YD') {
    title = 'RANGE (YD)'
  }
  if (range.value.unit === 'M') {
    title = 'RANGE (M)'
  }
  return title
}

const yAxisTitle = function () {
  let title

  if (range.value.unit === 'YD') {
    title = 'ELEVATION (IN)'
  }
  if (range.value.unit === 'M') {
    title = 'ELEVATION (CM)'
  }
  return title
}

const getDistanceUnit = function () {
  let unit
  if (range.value.unit === 'YD') {
    unit = BC.Unit.Yard
  }
  if (range.value.unit === 'M') {
    unit = BC.Unit.Meter
  }
  return unit
}
const getElevationUnit = function () {
  let unit
  if (range.value.unit === 'YD') {
    unit = BC.Unit.Inch
  }
  if (range.value.unit === 'M') {
    unit = BC.Unit.Centimeter
  }
  return unit
}

const tickAmount = function () {
  return range.value.distance / range.value.step - 1
}

const series = computed(function () {
  const array = []

  if (trajectories.value.length > 0) {
    trajectories.value.forEach((trajectory, index) => {
      const shot = trajectoriesStore.calculateShot(index, 1)

      const data = []

      if (shot) {
        for (const shotTrajectory of shot._trajectory) {
          let distance = shotTrajectory.distance.In(getDistanceUnit())
          distance = Math.round(distance)

          const elevation = Math.round(shotTrajectory.drop.In(getElevationUnit()) * 10) / 10

          data.push({
            x: distance,
            y: elevation
          })
        }
        array.push({
          name: trajectory.name,
          data
        })
      }
    })
  }

  return array
})

</script>
