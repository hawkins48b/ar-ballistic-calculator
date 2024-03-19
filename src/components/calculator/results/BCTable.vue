<template>
  <q-table
    flat
    :rows="rows"
    :columns="columns"
    :visible-columns="visibleColumns"
    row-key="distance"
    :loading="loading"
    :rows-per-page-options="[0]"
    :class="{'bg-grey-3':!$q.dark.isActive}"
    hide-pagination
  >
    <template #top="props">
      <div class="col-2 q-table__title">
        Elevation Table
      </div>

      <q-space />

      <div
        v-if="$q.screen.gt.xs"
        class="col"
      >
        <div class="row">
          <div
            class="col-4"
          >
            <div class="text-bold">
              Distance
            </div>
            <div>
              <q-toggle
                v-model="visibleColumns"
                val="distanceYD"
                label="Yard"
              />
            </div>
            <div>
              <q-toggle
                v-model="visibleColumns"
                val="distanceM"
                label="Meter"
              />
            </div>
          </div>
          <div
            class="col-4"
          >
            <div class="text-bold">
              Elevation
            </div>
            <div>
              <q-toggle
                v-model="visibleColumns"
                val="elevationIN"
                label="Inch"
              />
            </div>
            <div>
              <q-toggle
                v-model="visibleColumns"
                val="elevationCM"
                label="Centimeter"
              />
            </div>
          </div>
          <div
            class="col-4"
          >
            <div class="text-bold">
              Correction
            </div>
            <div>
              <q-toggle
                v-model="visibleColumns"
                val="correctionMOA"
                label="MOA"
              />
            </div>
            <div>
              <q-toggle
                v-model="visibleColumns"
                val="correctionMRAD"
                label="MRAD"
              />
            </div>
          </div>
        </div>
      </div>
      <q-select
        v-else
        v-model="visibleColumns"
        multiple
        borderless
        dense
        options-dense
        :display-value="$q.lang.table.columns"
        emit-value
        map-options
        :options="columns"
        option-value="name"
        style="min-width: 150px"
      />

      <q-btn
        flat
        round
        dense
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        class="q-ml-md"
        @click="props.toggleFullscreen"
      />
    </template>
    <template #loading>
      <q-inner-loading
        showing
        color="primary"
      />
    </template>
  </q-table>
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
      calcArgs: null,
      loading: true,
      rows: [],
      columns: [
        {
          name: 'distanceYD',
          field: 'distanceYD',
          label: 'Distance (YD)',
          format: (val, row) => `${Math.round(val)}`
        },
        // distance
        {
          name: 'distanceM',
          field: 'distanceM',
          label: 'Distance (M)',
          format: (val, row) => `${Math.round(val)}`
        },
        {
          name: 'elevationIN',
          field: 'elevationIN',
          label: 'Elevation (IN)',
          format: (val, row) => `${Math.round(val * 10) / 10}`
        },
        // elevation
        {
          name: 'elevationCM',
          field: 'elevationCM',
          label: 'Elevation (CM)',
          format: (val, row) => `${Math.round(val * 10) / 10}`
        },
        // correction
        {
          name: 'correctionMOA',
          field: 'correctionMOA',
          label: 'Correction (MOA)',
          format: (val, row) => `${Math.round(val * 10) / 10}`
        },

        {
          name: 'correctionMRAD',
          field: 'correctionMRAD',
          label: 'Correction (MRAD)',
          format: (val, row) => `${Math.round(val * 10) / 10}`
        }
      ],
      visibleColumns: []
    }
  },
  mounted () {
    // get ballistic calculator arguments
    this.calcArgs = JSON.parse(LocalStorage.getItem('bc-args'))

    this.initVisibleColumns()

    this.startBallisticCalculator()
  },
  methods: {
    initVisibleColumns () {
      console.log('this.calcArgs.resultUnits', this.calcArgs.resultUnits)
      if (this.calcArgs.resultsUnit === 'YD') {
        this.visibleColumns = ['distanceYD', 'elevationIN', 'correctionMOA']
      }
      if (this.calcArgs.resultsUnit === 'M') {
        this.visibleColumns = ['distanceM', 'elevationCM', 'correctionMRAD']
      }
    },
    startBallisticCalculator () {
      this.rows = calculateAdjustments(this.calcArgs)
      this.loading = false
      console.log('rows', this.rows)
    }
  }
}
</script>
