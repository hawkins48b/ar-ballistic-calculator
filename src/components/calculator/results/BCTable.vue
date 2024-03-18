<template>
  <q-markup-table flat>
    <thead>
      <tr>
        <th class="text-left">
          Distance
        </th>
        <th class="text-left">
          Elevation
        </th>
        <th class="text-left">
          Flight time
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in resultsRows"
        :key="index"
      >
        <td> {{ row.distance }}</td>
        <td> {{ row.elevation }}</td>
        <td> {{ row.flightTime }}</td>
      </tr>
    </tbody>
  </q-markup-table>
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
      resultsRows: []
    }
  },
  mounted () {
    this.resultsRows = calculateAdjustments(this.calcArgs)
  }
}
</script>
