<template>
  <div class="row q-gutter-md">
    <div class="col">
      <q-input
        v-model.number="velocity"
        label="Velocity"
        filled
        step="any"
        type="number"
        lazy-rules
        :rules="[
          val => val && val > 0 || 'Velocity must be positive'
        ]"
        hint="Use a chronograph"
      >
        <template #append>
          <q-btn-toggle
            v-model="velocityUnit"
            no-caps
            dense
            :options="[
              {label: 'FPS', value: 'FPS'},
              {label: 'MPS', value: 'MPS'}
            ]"
          />
        </template>
      </q-input>
    </div>
    <div class="col">
      <q-input
        v-model.number="temperature"
        label="Temperature"
        filled
        step="any"
        type="number"
        lazy-rules
        :rules="[
          val => !isNaN(val) || 'Temperature must be a number'
        ]"
        hint="Current temperature"
      >
        <template #append>
          <q-btn-toggle
            v-model="temperatureUnit"
            dense
            no-caps
            :options="[
              {label: '°F', value: '°F'},
              {label: '°C', value: '°C'}
            ]"
          />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup>
import * as BC from 'js-ballistics'
import { watch } from 'vue'

const velocity = defineModel('velocity', {
  type: [String, Number]
})
const velocityUnit = defineModel('velocity-unit', {
  type: [String]
})
const temperature = defineModel('temperature', {
  type: [String, Number]
})
const temperatureUnit = defineModel('temperature-unit', {
  type: [String]
})
/*
 * Unit conversion
 */

// conversion for velocity
watch(velocityUnit, (newUnit) => {
  if (newUnit === 'FPS') {
    const speed = BC.UNew.MPS(velocity.value)
    const fps = speed.In(BC.Unit.FPS)
    velocity.value = Math.round(fps * 1000) / 1000
  }
  if (newUnit === 'MPS') {
    const speed = BC.UNew.FPS(velocity.value)
    const mps = speed.In(BC.Unit.MPS)
    velocity.value = Math.round(mps * 1000) / 1000
  }
})
// conversion for temperature
watch(temperatureUnit, (newUnit) => {
  if (newUnit === '°F') {
    const temp = BC.UNew.Celsius(temperature.value)
    const fahrenheit = temp.In(BC.Unit.Fahrenheit)
    temperature.value = Math.round(fahrenheit * 10) / 10
  }
  if (newUnit === '°C') {
    const temp = BC.UNew.Fahrenheit(temperature.value)
    const celcius = temp.In(BC.Unit.Celsius)
    temperature.value = Math.round(celcius * 10) / 10
  }
})
</script>
