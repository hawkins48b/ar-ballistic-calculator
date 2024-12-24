<template>
  <q-form>
    <q-toggle
      v-model="atmosphere.useISA"
      @update:model-value="changeISA()"
    >
      Use standard atmosphere
    </q-toggle>
    <q-input
      v-model="atmosphere.altitude"
      label="Altitude"
      type="number"
      :disable="atmosphere.useISA"
      hint="Altitude has little to no impact."
      filled
      debounce="500"
      class="q-mt-md"
    >
      <template #append>
        <q-btn-toggle
          v-model="atmosphere.altitudeUnit"
          no-caps
          :options="[
            {label: 'FT', value: 'FT'},
            {label: 'M', value: 'M'}
          ]"
          @update:model-value="changeAltitudeUnit()"
        />
      </template>
    </q-input>
    <q-input
      v-model="atmosphere.pressure"
      label="Barometric pressure"
      type="number"
      :disable="atmosphere.useISA"
      hint="Altitude has a BIG impact."
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
          @update:model-value="changePressureUnit()"
        />
      </template>
    </q-input>
    <q-input
      v-model="atmosphere.temperature"
      label="Temperature"
      type="number"
      :disable="atmosphere.useISA"
      hint="Temperature has a BIG impact."
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
          @update:model-value="changeTemperatureUnit()"
        />
      </template>
    </q-input>
    <q-input
      v-model="atmosphere.humidity"
      label="Humidity"
      type="number"
      :disable="atmosphere.useISA"
      hint="Humidity has little to no impact."
      filled
      debounce="500"
      class="q-mt-md"
      suffix="%"
    />
  </q-form>
</template>

<script setup>
// imports
import { useBallisticStore } from 'stores/ballistic'
import { defineModel } from 'vue'
import * as BC from 'js-ballistics'

// ballistic store
const ballisticStore = useBallisticStore()

const atmosphere = defineModel({
  type: Object,
  required: true
})

// conversion for altitude
const changeAltitudeUnit = function () {
  if (!atmosphere.value.useISA) {
    if (atmosphere.value.altitudeUnit === 'FT') {
      atmosphere.value.altitude = BC.UNew.Meter(atmosphere.value.altitude).In(BC.Unit.Foot)
    }
    if (atmosphere.value.altitudeUnit === 'M') {
      atmosphere.value.altitude = BC.UNew.Foot(atmosphere.value.altitude).In(BC.Unit.Meter)
    }
    atmosphere.value.altitude = Math.round(atmosphere.value.altitude * 10) / 10
  }
}
// conversion for pressure
const changePressureUnit = function () {
  if (!atmosphere.value.useISA) {
    if (atmosphere.value.pressureUnit === 'IN/HG') {
      atmosphere.value.pressure = BC.UNew.hPa(atmosphere.value.pressure).In(BC.Unit.InHg)
    }
    if (atmosphere.value.pressureUnit === 'HPA') {
      atmosphere.value.pressure = BC.UNew.InHg(atmosphere.value.pressure).In(BC.Unit.hPa)
    }
    atmosphere.value.pressure = Math.round(atmosphere.value.pressure * 100) / 100
  }
}

// conversion for temperature
const changeTemperatureUnit = function () {
  if (!atmosphere.value.useISA) {
    if (atmosphere.value.temperatureUnit === '°F') {
      atmosphere.value.temperature = BC.UNew.Celsius(atmosphere.value.temperature).In(BC.Unit.Fahrenheit)
    }
    if (atmosphere.value.temperatureUnit === '°C') {
      atmosphere.value.temperature = BC.UNew.Fahrenheit(atmosphere.value.temperature).In(BC.Unit.Celsius)
    }
    atmosphere.value.temperature = Math.round(atmosphere.value.temperature * 10) / 10
  }
}

const changeISA = function () {
  if (atmosphere.value.useISA) {
    atmosphere.value = ballisticStore.getISA
  }
}

</script>
