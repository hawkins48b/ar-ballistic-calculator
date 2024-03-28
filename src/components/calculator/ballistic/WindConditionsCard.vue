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
          @click="calculatorStore.resetWind"
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
      filled
      debounce="500"
      class="q-mt-md"
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
      class="q-mt-md"
      suffix="°"
    />
  </q-card>
</template>

<script setup>
// imports
import { storeToRefs } from 'pinia'
import { useCalculatorStore } from 'stores/calculator'
import { watch } from 'vue'

// calculator store
const calculatorStore = useCalculatorStore()
// wind state
const {
  wind,
  options
} = storeToRefs(calculatorStore)

// if we hide wind conditions, reset wind parameters
watch(() => options.value.showWindConditions, (newValue) => {
  if (!newValue) {
    calculatorStore.resetWind()
  }
}, {
  immediate: true
})
</script>
