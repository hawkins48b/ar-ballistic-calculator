<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <div class="row justify-between">
      <div class="col-auto">
        <p class="text-h6">
          Shot Angle
        </p>
      </div>
      <div class="col-auto">
        <q-btn
          icon="restart_alt"
          flat
          @click="calculatorStore.resetShotAngle"
        >
          <q-tooltip>
            Reset
          </q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-input
      v-model="shotAngle.relativeAngle"
      label="Rifle elevation angle"
      type="number"
      filled
      debounce="500"
      class="q-mt-md"
      suffix="degrees"
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
  shotAngle,
  options
} = storeToRefs(calculatorStore)

// if we hide wind conditions, reset wind parameters
watch(() => options.value.showShotAngle, (newValue) => {
  if (!newValue) {
    calculatorStore.resetShotAngle()
  }
}, {
  immediate: true
})
</script>
