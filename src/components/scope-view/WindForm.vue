<template>
  <div>
    <q-input
      v-model="wind.speed"
      label="Wind speed"
      type="number"
      step="any"
      filled
      debounce="500"
      class="q-mt-md"
      :rules="[
        val => val && parseFloat(val) >= 0 || 'Wind speed must be 0 or positive'
      ]"
      lazy-rules
      hint="Wind speed estimation."
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
      v-model="wind.direction"
      label="Wind direction"
      type="number"
      step="any"
      filled
      debounce="500"
      class="q-mt-md"
      :rules="[
        val => val && parseFloat(val) >= 0 || 'Wind direction must be 0 or positive'
      ]"
      hint="Direction where the wind is going to."
      lazy-rules
    >
      <template #append>
        <q-btn-toggle
          v-model="wind.directionUnit"
          no-caps
          :options="[
            {label: 'CLOCK', value: 'CLOCK'},
            {label: 'DEG', value: 'DEG'}
          ]"
        />
      </template>
    </q-input>
    <div class="text-center q-mt-md">
      <q-knob
        v-if="wind.directionUnit==='CLOCK'"
        v-model="wind.direction"
        :min="0"
        :max="12"
        show-value
        size="100px"
        :thickness="0.22"
        color="primary"
        track-color="grey-5"
      >
        <q-icon
          name="air"
        />
      </q-knob>
      <q-knob
        v-if="wind.directionUnit==='DEG'"
        v-model="wind.direction"
        :min="0"
        :max="360"
        show-value
        size="100px"
        :thickness="0.22"
        color="primary"
        track-color="grey-5"
      >
        <q-icon
          name="air"
        />
      </q-knob>
    </div>
  </div>
</template>

<script setup>
import { useScopeViewStore } from 'stores/scopeview'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import * as BC from 'js-ballistics'

const scopeViewStore = useScopeViewStore()
const { wind } = storeToRefs(scopeViewStore)

/*
 * Unit conversion
 */
// conversion wind speed
watch(() => wind.value.speedUnit, (newValue) => {
  if (newValue === 'MPH') {
    wind.value.speed = BC.UNew.MPS(parseFloat(wind.value.speed)).In(BC.Unit.MPH)
    wind.value.speed = Math.round(wind.value.speed * 100) / 100
  }
  if (newValue === 'MPS') {
    wind.value.speed = BC.UNew.MPH(parseFloat(wind.value.speed)).In(BC.Unit.MPS)
    wind.value.speed = Math.round(wind.value.speed * 100) / 100
  }
})
// conversion wind direction
watch(() => wind.value.directionUnit, (newValue) => {
  if (newValue === 'CLOCK') {
    wind.value.direction = BC.UNew.Degree(parseFloat(wind.value.direction)).In(BC.Unit.OClock)
    wind.value.direction = Math.round(wind.value.direction)
  }
  if (newValue === 'DEG') {
    wind.value.direction = BC.UNew.OClock(parseFloat(wind.value.direction)).In(BC.Unit.Degree)
    wind.value.direction = Math.round(wind.value.direction)
  }
})
</script>
