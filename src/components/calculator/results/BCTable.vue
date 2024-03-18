<template>
  <q-table
    flat
    bordered
    :rows="resultsRows"
    :colums="resultsColumns"
    :row-key="resultsKey"
    :rows-per-page-options="[0]"
    hide-footer
  />
</template>

<script>

import {
  calculateAdjustments
} from 'components/calculator/BalisticCalculator.js'

import { LocalStorage } from 'quasar'

export default {

  setup () {
    return {}
  },
  data: function () {
    return {
      calcArgs: JSON.parse(LocalStorage.getItem('bc-args')),
      resultsRows: [],
      resultsColumns: [
        {
          name: 'distance',
          required: true,
          label: 'Distance',
          align: 'left',
          sortable: false,
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: 'adjustment',
          required: true,
          label: 'Elevation (cm)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: 'time',
          required: true,
          label: 'Flight time',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        }
      ],
      resultsKey: 'distance'
    }
  },
  mounted () {
    this.resultsRows = calculateAdjustments(this.calcArgs)
    console.log(this.resultsRows)
  }
}
</script>
