<template>
  <q-card
    v-if="rows"
    flat
    :class="{'bg-grey-3':!$q.dark.isActive}"
    class="q-pa-md"
  >
    <div class="row justify-between">
      <div class="col-auto">
        <div class="text-h6">
          <q-icon
            name="text_snippet"
            size="lg"
            class="q-mr-sm"
          />
          Table
        </div>
      </div>
      <div class="col-auto">
        <q-btn
          icon="archive"
          class="q-ml-md"
          flat
          @click="exportCSV"
        >
          &nbsp;Export CSV
        </q-btn>
      </div>
    </div>
    <q-select
      v-model="ballisticStore.results.table.visibleColumns"
      multiple
      filled
      options-dense
      emit-value
      map-options
      use-chips
      :options="columns"
      option-value="name"
      option-label="label"
      display-value="Columns"
      label="Columns"
      style="min-width: 150px"
      class="q-mt-sm"
    />

    <q-table
      v-if="rows"
      flat
      :rows="rows._trajectory"
      :columns="columns"
      :visible-columns="ballisticStore.results.table.visibleColumns"
      row-key="distance"
      :rows-per-page-options="[0]"
      :class="{'bg-grey-3':!$q.dark.isActive}"
      hide-pagination
    >
      <template #body-cell="props">
        <q-td :props="props">
          {{ props.value }}
          <q-tooltip
            anchor="top left"
            self="top middle"
          >
            {{ props.col.label }}
          </q-tooltip>
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup>
// imports
import { useBallisticStore } from 'stores/ballistic'
import * as BC from 'js-ballistics'
import { computed } from 'vue'
import { exportFile, useQuasar } from 'quasar'

// Quasar $q
const $q = useQuasar()

// calculate trajectory
const ballisticStore = useBallisticStore()
const rows = computed(() => ballisticStore.calculateShot)

// set qtable properties
const columns = computed(() => {
  let columnsArray = [
    {
      name: 'rangeYD',
      field: row => row.distance.In(BC.Unit.Yard),
      label: 'Range (YD)',
      format: (val, row) => `${Math.round(val)} YD`,
      align: 'left'
    },
    // distance
    {
      name: 'rangeM',
      field: row => row.distance.In(BC.Unit.Meter),
      label: 'Range (M)',
      format: (val, row) => `${Math.round(val)} M`,
      align: 'left'
    },
    {
      name: 'elevationIN',
      field: row => row.drop.In(BC.Unit.Inch),
      label: 'Elevation (IN)',
      format: (val, row) => `${Math.round(val * 10) / 10} IN`,
      align: 'left'
    },
    // elevation
    {
      name: 'elevationCM',
      field: row => row.drop.In(BC.Unit.Centimeter),
      label: 'Elevation (CM)',
      format: (val, row) => `${Math.round(val * 10) / 10} CM`,
      align: 'left'
    },
    // correction
    {
      name: 'elevationAdjustmentMOA',
      field: row => isNaN(row.dropAdjustment.In(BC.Unit.MOA)) ? 0 : row.dropAdjustment.In(BC.Unit.MOA),
      label: 'Elevation (MOA)',
      format: (val, row) => `${Math.round(val * 10) / 10 * -1} MOA`,
      align: 'left'
    },
    {
      name: 'elevationAdjustmentMRAD',
      field: row => isNaN(row.dropAdjustment.In(BC.Unit.MIL)) ? 0 : row.dropAdjustment.In(BC.Unit.MIL),
      label: 'Elevation (MRAD)',
      format: (val, row) => `${Math.round(val * 10) / 10 * -1} MRAD`,
      align: 'left'
    },
    // velocity
    {
      name: 'velocityFPS',
      field: row => row.velocity.In(BC.Unit.FPS),
      label: 'Velocity (FPS)',
      format: (val, row) => `${Math.round(val)} FPS`,
      align: 'left'
    },
    {
      name: 'velocityMPS',
      field: row => row.velocity.In(BC.Unit.MPS),
      label: 'Velocity (MPS)',
      format: (val, row) => `${Math.round(val)} MPS`,
      align: 'left'
    },
    // velocity
    {
      name: 'energyFtLb',
      field: row => row.energy.In(BC.Unit.FootPound),
      label: 'Energy (FT/LB)',
      format: (val, row) => `${Math.round(val)} FT/LB`,
      align: 'left'
    },
    {
      name: 'energyJ',
      field: row => row.energy.In(BC.Unit.Joule),
      label: 'Energy (J)',
      format: (val, row) => `${Math.round(val)} J`,
      align: 'left'
    },
    // Flight time
    {
      name: 'flightTimeS',
      field: row => row.time,
      label: 'Flight time (S)',
      format: (val, row) => `${Math.round(val * 100) / 100} S`,
      align: 'left'
    }
  ]

  // show windage if selected in options
  if (ballisticStore.options.showWindConditions) {
    const windageColumns = [// Windage
      {
        name: 'windageIN',
        field: row => row.windage.In(BC.Unit.Inch),
        label: 'Windage (IN)',
        format: (val, row) => `${Math.round(val * 10) / 10 * -1} IN`,
        align: 'left'
      },
      {
        name: 'windageCM',
        field: row => row.windage.In(BC.Unit.Centimeter),
        label: 'Windage (CM)',
        format: (val, row) => `${Math.round(val * 10) / 10 * -1} CM`,
        align: 'left'
      },
      // Windage Adjustment
      {
        name: 'windageAdjustmentMOA',
        field: row => isNaN(row.windageAdjustment.In(BC.Unit.MOA)) ? 0 : row.windageAdjustment.In(BC.Unit.MOA),
        label: 'Windage (MOA)',
        format: (val, row) => `${Math.round(val * 10) / 10 * -1} MOA`,
        align: 'left'
      },
      {
        name: 'windageAdjustmentMRAD',
        field: row => isNaN(row.windageAdjustment.In(BC.Unit.MIL)) ? 0 : row.windageAdjustment.In(BC.Unit.MIL),
        label: 'Windage (MRAD)',
        format: (val, row) => `${Math.round(val * 10) / 10 * -1} MRAD`,
        align: 'left'
      }
    ]
    const indexToPush = columnsArray.findIndex((column) => column.name === 'velocityFPS')
    columnsArray = [
      ...columnsArray.slice(0, indexToPush),
      ...windageColumns,
      ...columnsArray.slice(indexToPush)
    ]
  }

  return columnsArray
})

/*
 * CSV Export
 */
const exportCSV = () => {
  let csvOutput = 'Range (YD),Range (M),Elevation (IN),Elevation (CM),Elevation (MOA),Elevation (MRAD),Windage (IN),Windage (CM),Windage (MOA),Windage (MRAD),Velocity (FPS),Velocity (MPS),Energy (FT/LB),Energy (J),Flight time (S)\r\n'

  for (const trajectory of rows.value._trajectory) {
    csvOutput += Math.round(trajectory.distance.In(BC.Unit.Yard)) + ','
    csvOutput += Math.round(trajectory.distance.In(BC.Unit.Meter)) + ','
    csvOutput += Math.round(trajectory.drop.In(BC.Unit.Inch) * 10) / 10 + ','
    csvOutput += Math.round(trajectory.drop.In(BC.Unit.Centimeter) * 10) / 10 + ','
    csvOutput += Math.round(trajectory.dropAdjustment.In(BC.Unit.MOA) * 10) / 10 + ','
    csvOutput += Math.round(trajectory.dropAdjustment.In(BC.Unit.MIL) * 10) / 10 + ','
    csvOutput += Math.round(trajectory.windage.In(BC.Unit.Inch) * 10) / 10 + ','
    csvOutput += Math.round(trajectory.windage.In(BC.Unit.Centimeter) * 10) / 10 + ','
    csvOutput += Math.round(trajectory.windageAdjustment.In(BC.Unit.MOA) * 10) / 10 + ','
    csvOutput += Math.round(trajectory.windageAdjustment.In(BC.Unit.MIL) * 10) / 10 + ','
    csvOutput += Math.round(trajectory.velocity.In(BC.Unit.FPS)) + ','
    csvOutput += Math.round(trajectory.velocity.In(BC.Unit.MPS)) + ','
    csvOutput += Math.round(trajectory.energy.In(BC.Unit.FootPound)) + ','
    csvOutput += Math.round(trajectory.energy.In(BC.Unit.Joule)) + ','
    csvOutput += Math.round(trajectory.time * 100) / 100 + ','
    csvOutput += '\r\n'
  }

  const status = exportFile(
    'elevation-export.csv',
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
