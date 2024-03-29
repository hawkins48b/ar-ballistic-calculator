<template>
  <q-card
    flat
    :class="{'bg-grey-3':!$q.dark.isActive}"
    class="q-pa-md"
  >
    <q-table
      flat
      :rows="rows._trajectory"
      :columns="columns"
      :visible-columns="visibleColumns"
      row-key="distance"
      :rows-per-page-options="[0]"
      :class="{'bg-grey-3':!$q.dark.isActive}"
      hide-pagination
    >
      <template #top>
        <div class="col-3 q-table__title">
          Windage Table
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
                Windage
              </div>
              <div>
                <q-toggle
                  v-model="visibleColumns"
                  val="windageIN"
                  label="Inch"
                />
              </div>
              <div>
                <q-toggle
                  v-model="visibleColumns"
                  val="windageCM"
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
          icon="archive"
          class="q-ml-md"
          flat
          @click="exportCSV"
        >
          <q-tooltip>Export CSV</q-tooltip>
        </q-btn>
      </template>
    </q-table>
  </q-card>
</template>

<script setup>
// imports
import { useBallisticStore } from 'stores/ballistic'
import * as BC from 'js-ballistics'
import { ref, computed } from 'vue'
import { exportFile, useQuasar } from 'quasar'

// quasar obj
const $q = useQuasar()

// calculate trajectory
const ballisticStore = useBallisticStore()
const rows = computed(() => ballisticStore.calculateTrajectory)

// set qtable properties
const columns = [
  {
    name: 'distanceYD',
    field: row => row.distance.In(BC.Unit.Yard),
    label: 'Distance (YD)',
    format: (val, row) => `${Math.round(val)}`,
    align: 'left'
  },
  // distance
  {
    name: 'distanceM',
    field: row => row.distance.In(BC.Unit.Meter),
    label: 'Distance (M)',
    format: (val, row) => `${Math.round(val)}`,
    align: 'left'
  },
  // Windage
  {
    name: 'windageIN',
    field: row => row.windage.In(BC.Unit.Inch),
    label: 'Windage (IN)',
    format: (val, row) => `${Math.round(val * 10) / 10 * -1}`,
    align: 'left'
  },
  {
    name: 'windageCM',
    field: row => row.windage.In(BC.Unit.Centimeter),
    label: 'Windage (CM)',
    format: (val, row) => `${Math.round(val * 10) / 10 * -1}`,
    align: 'left'
  },
  // Adjustment
  {
    name: 'correctionMOA',
    field: row => row.windageAdjustment.In(BC.Unit.MOA),
    label: 'Correction (MOA)',
    format: (val, row) => `${Math.round(val * 10) / 10 * -1}`,
    align: 'left'
  },
  {
    name: 'correctionMRAD',
    field: row => row.windageAdjustment.In(BC.Unit.MIL),
    label: 'Correction (MRAD)',
    format: (val, row) => `${Math.round(val * 10) / 10 * -1}`,
    align: 'left'
  }
]

// visible columns
const visibleColumns = ref([])
const range = computed(() => ballisticStore.range)
if (range.value.unit === 'YD') {
  visibleColumns.value = ['distanceYD', 'windageIN', 'adjustmentMOA']
}
if (range.value.unit === 'M') {
  visibleColumns.value = ['distanceM', 'windageCM', 'adjustmentMRAD']
}
// csv export
const exportCSV = () => {
  let csvOutput = 'Distance (YD),Distance (M,Windage (IN),Windage (CM),Correction (MOA),Correction (MRAD)\r\n'

  for (const trajectory of rows.value._trajectory) {
    csvOutput += Math.round(trajectory.distance.In(BC.Unit.Yard)) + ','
    csvOutput += Math.round(trajectory.distance.In(BC.Unit.Meter)) + ','
    csvOutput += Math.round(trajectory.windage.In(BC.Unit.Inch) * 10) / 10 + ','
    csvOutput += Math.round(trajectory.windage.In(BC.Unit.Centimeter) * 10) / 10 + ','
    csvOutput += Math.round(trajectory.windageAdjustment.In(BC.Unit.MOA) * 10) / 10 + ','
    csvOutput += Math.round(trajectory.windageAdjustment.In(BC.Unit.MIL) * 10) / 10
    csvOutput += '\r\n'
  }

  const status = exportFile(
    'windage-export.csv',
    csvOutput,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }
}
</script>
