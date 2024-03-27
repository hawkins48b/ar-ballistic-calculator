<template>
  <q-form>
    <q-input
      v-model="atmosphere.altitude"
      label="Altitude"
      type="number"
      :disable="atmosphere.useISA"
      filled
      debounce="500"
    >
      <template #append>
        <q-btn-toggle
          v-model="atmosphere.altitudeUnit"
          no-caps
          :options="[
            {label: 'FT', value: 'FT'},
            {label: 'M', value: 'M'}
          ]"
        />
      </template>
    </q-input>
    <q-input
      v-model="atmosphere.pressure"
      label="Barometric pressure"
      type="number"
      :disable="atmosphere.useISA"
      filled
      debounce="500"
      class="q-mt-md"
    >
      <template #append>
        <q-btn-toggle
          v-model="atmosphere.pressureUnit"
          no-caps
          :options="[
            {label: 'IN/HG', value: 'IN/HG'},
            {label: 'HPA', value: 'HPA'}
          ]"
        />
      </template>
    </q-input>
    <q-input
      v-model="atmosphere.temperature"
      label="Temperature"
      type="number"
      :disable="atmosphere.useISA"
      filled
      debounce="500"
      class="q-mt-md"
    >
      <template #append>
        <q-btn-toggle
          v-model="atmosphere.temperatureUnit"
          no-caps
          :options="[
            {label: '°F', value: '°F'},
            {label: '°C', value: '°C'}
          ]"
        />
      </template>
    </q-input>
    <q-input
      v-model="atmosphere.humidity"
      label="Humidity"
      type="number"
      :disable="atmosphere.useISA"
      filled
      debounce="500"
      class="q-mt-md"
      suffix="%"
    />
  </q-form>
</template>

<script setup>
// imports
import { storeToRefs } from 'pinia'
import { useCalculatorStore } from 'stores/calculator'
import { watch } from 'vue'
import * as BC from 'js-ballistics'

// calculator store
const calculatorStore = useCalculatorStore()

// options
const {
  atmosphere
} = storeToRefs(calculatorStore)

// conversion for altitude
watch(() => calculatorStore.atmosphere.altitudeUnit, (newValue) => {
  if (!atmosphere.value.useISA) {
    if (newValue === 'FT') {
      atmosphere.value.altitude = BC.UNew.Meter(atmosphere.value.altitude).In(BC.Unit.Foot)
    }
    if (newValue === 'M') {
      atmosphere.value.altitude = BC.UNew.Foot(atmosphere.value.altitude).In(BC.Unit.Meter)
    }
    atmosphere.value.altitude = Math.round(atmosphere.value.altitude * 10) / 10
  }
})
// conversion for pressure
watch(() => calculatorStore.atmosphere.pressureUnit, (newValue) => {
  if (!atmosphere.value.useISA) {
    if (newValue === 'IN/HG') {
      atmosphere.value.pressure = BC.UNew.hPa(atmosphere.value.pressure).In(BC.Unit.InHg)
    }
    if (newValue === 'HPA') {
      atmosphere.value.pressure = BC.UNew.InHg(atmosphere.value.pressure).In(BC.Unit.hPa)
    }
    atmosphere.value.pressure = Math.round(atmosphere.value.pressure * 100) / 100
  }
})
// conversion for temperature
watch(() => calculatorStore.atmosphere.temperatureUnit, (newValue) => {
  if (!atmosphere.value.useISA) {
    if (newValue === '°F') {
      atmosphere.value.temperature = BC.UNew.Celsius(atmosphere.value.temperature).In(BC.Unit.Fahrenheit)
    }
    if (newValue === '°C') {
      atmosphere.value.temperature = BC.UNew.Fahrenheit(atmosphere.value.temperature).In(BC.Unit.Celsius)
    }
    atmosphere.value.temperature = Math.round(atmosphere.value.temperature)
  }
})

// set ISA values if we use ISA
watch(() => calculatorStore.atmosphere.useISA, (newValue) => {
  if (newValue) {
    calculatorStore.setISA()
  }
}, {
  immediate: true
})

</script>
