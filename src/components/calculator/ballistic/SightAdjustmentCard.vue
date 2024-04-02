<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md full-height"
  >
    <div class="row justify-between">
      <div class="col-auto">
        <p class="text-h6">
          Sight adjustment
        </p>
      </div>
      <div class="col-auto">
        <q-btn
          icon="restart_alt"
          flat
          @click="ballisticStore.resetSightAdjustment"
        >
          <q-tooltip>
            Reset
          </q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-input
      v-model="sightAdjustment.angle"
      label="Sight adjustment"
      type="number"
      filled
      debounce="500"
      class="q-mt-md"
      :rules="[
        val => val !== '' || 'Sight adjustment must not be empty',
      ]"
    >
      <template #append>
        <q-btn-toggle
          v-model="sightAdjustment.unit"
          no-caps
          :options="[
            {label: 'MOA', value: 'MOA'},
            {label: 'MRAD', value: 'MRAD'}
          ]"
        />
      </template>
    </q-input>
  </q-card>
</template>

<script setup>
// imports
import { storeToRefs } from 'pinia'
import { useBallisticStore } from 'stores/ballistic'
import { watch } from 'vue'

// ballistic store
const ballisticStore = useBallisticStore()
// wind state
const {
  sightAdjustment,
  options
} = storeToRefs(ballisticStore)

// if we hide wind conditions, reset wind parameters
watch(() => options.value.showSightAdjustment, (newValue) => {
  if (!newValue) {
    ballisticStore.resetSightAdjustment()
  }
}, {
  immediate: true
})
</script>
