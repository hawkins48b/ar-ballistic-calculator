<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <div class="row justify-between">
      <div class="col-auto">
        <p class="text-h6">
          Wind conditions
        </p>
      </div>
      <div class="col-auto">
        <q-btn
          icon="restart_alt"
          flat
          @click="ballisticStore.resetWind"
        >
          <q-tooltip>
            Reset
          </q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-input
      v-model="wind.speed"
      label="Wind speed"
      type="number"
      step="any"
      filled
      debounce="500"
      class="q-mt-md"
      :rules="[
        val => val && val >= 0 || 'Wind speed must be 0 or positive'
      ]"
      lazy-rules
    >
      <template #append>
        <q-btn-toggle
          v-model="wind.speedUnit"
          no-caps
          :options="[
            {label: 'MPH', value: 'MPH'},
            {label: 'MPS', value: 'MPS'}
          ]"
        />
      </template>
    </q-input>
    <q-input
      v-model="wind.angle"
      label="Wind angle"
      type="number"
      filled
      debounce="500"
      :rules="[
        val => val && val >= 0 || 'Wind speed must set to minimum 0.'
      ]"
      class="q-mt-md"
      suffix="degrees"
    >
      <template #append>
        <WindRepresentation :wind-angle="wind.angle" />
      </template>
    </q-input>
  </q-card>
</template>

<script setup>
// imports
import WindRepresentation from 'components/calculator/ballistic/WindRepresentation.vue'
import { storeToRefs } from 'pinia'
import { useBallisticStore } from 'stores/ballistic'
import { watch } from 'vue'

// ballistic store
const ballisticStore = useBallisticStore()
// wind state
const {
  wind,
  options
} = storeToRefs(ballisticStore)

// if we hide wind conditions, reset wind parameters
watch(() => options.value.showWindConditions, (newValue) => {
  if (!newValue) {
    ballisticStore.resetWind()
  }
}, {
  immediate: true
})
</script>
