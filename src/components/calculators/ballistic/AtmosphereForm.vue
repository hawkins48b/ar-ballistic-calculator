<template>
  <q-form>
    <q-toggle v-model="atmosphere.useISA">
      Use standard atmosphere
    </q-toggle>
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
      :rules="[
        val => val && val >= 0 && val <= 100 || 'Humidity must be between 0 and 100'
      ]"
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
import { useBallisticStore } from 'stores/ballistic'
import { watch } from 'vue'
import * as BC from 'js-ballistics'

// ballistic store
const ballisticStore = useBallisticStore()

// options
const {
  atmosphere
} = storeToRefs(ballisticStore)

// conversion for pressure
watch(() => ballisticStore.atmosphere.pressureUnit, (newValue) => {
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
watch(() => ballisticStore.atmosphere.temperatureUnit, (newValue) => {
  if (!atmosphere.value.useISA) {
    if (newValue === '°F') {
      atmosphere.value.temperature = BC.UNew.Celsius(atmosphere.value.temperature).In(BC.Unit.Fahrenheit)
    }
    if (newValue === '°C') {
      atmosphere.value.temperature = BC.UNew.Fahrenheit(atmosphere.value.temperature).In(BC.Unit.Celsius)
    }
    atmosphere.value.temperature = Math.round(atmosphere.value.temperature * 10) / 10
  }
})

// set ISA values if we use ISA
watch(() => ballisticStore.atmosphere.useISA, (newValue) => {
  if (newValue) {
    ballisticStore.setISA()
  }
}, {
  immediate: true
})

</script>
