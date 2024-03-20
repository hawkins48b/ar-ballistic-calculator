<template>
  <q-card
    flat
    rounded
    class="q-pt-md q-pl-md q-pr-md"
    :class="{'bg-grey-3':!$q.dark.isActive}"
  >
    <div class="q-mb-sm text-h6">
      Elevation Graph
    </div>
    <apexchart
      type="line"
      :options="options"
      :series="series"
      height="300px"
    />
  </q-card>
</template>

<script>

import {
  calculateAdjustments
} from 'components/calculator/BalisticCalculator.js'

import { colors, LocalStorage } from 'quasar'

export default {
  // name: 'ComponentName',
  setup () {
    return {}
  },
  data: function () {
    return {
      calcArgs: null,
      elevationResults: [],
      options: {
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
          mode: this.$q.dark.isActive ? 'dark' : 'light'
        },
        series: [],
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
      },
      series: []
    }
  },
  mounted () {
    // get ballistic calculator arguments
    this.calcArgs = JSON.parse(LocalStorage.getItem('bc-args'))

    this.startBallisticCalculator()

    this.setupChart()
  },
  methods: {
    startBallisticCalculator () {
      this.elevationResults = calculateAdjustments(this.calcArgs)
    },
    setupChart () {
      this.buildSeries()
    },
    buildSeries () {
      const data = []
      let serieName
      let xAxisTitle
      let yAxisTitle
      for (const element of this.elevationResults) {
        if (this.calcArgs.resultsUnit === 'YD') {
          let elevation = Number(element.elevationIN)
          elevation = Math.round(elevation * 10) / 10

          let distance = Number(element.distanceYD)
          distance = Math.round(distance)
          data.push({
            x: distance,
            y: elevation
          })
          serieName = 'Elevation (IN)'
          xAxisTitle = 'RANGE (YD)'
          yAxisTitle = 'ELEVATION (YD)'
        }
        if (this.calcArgs.resultsUnit === 'M') {
          let elevation = Number(element.elevationCM)
          elevation = Math.round(elevation * 10) / 10

          let distance = Number(element.distanceM)
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

      this.series.push({
        name: serieName,
        data
      })

      // set correct legend
      this.options.xaxis.title.text = xAxisTitle
      this.options.yaxis.title.text = yAxisTitle
    }
  }
}
</script>
