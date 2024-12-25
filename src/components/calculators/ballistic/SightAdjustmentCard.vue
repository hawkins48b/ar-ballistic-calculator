<template>
  <zroCard
    class="full-height"
  >
    <q-card-section>
      <div class="row justify-between">
        <div class="col-auto">
          <div class="text-h6">
            <q-icon
              name="build_circle"
              size="lg"
              class="q-mr-sm"
            />
            Sight adjustment
          </div>
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
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-input
        v-model="sightAdjustment.angle"
        label="Sight elevation adjustment"
        type="text"
        filled
        debounce="500"
        class="q-mt-md"
        :rules="[
          val => val !== '' || 'Sight elevation adjustment must not be empty',
        ]"
        hint="Elevation adjustments made after zero"
        inputmode="numeric"
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
    </q-card-section>
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
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
