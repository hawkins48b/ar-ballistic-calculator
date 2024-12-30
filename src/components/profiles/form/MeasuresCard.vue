<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Measures
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-input
        v-model="localProfile.measures.velocity"
        label="Velocity"
        filled
        step="any"
        type="number"
        lazy-rules
        :rules="[ val => val && val > 0 || 'Velocity must be positive']"
        class="q-mt-md"
        hint="e.g 3000 FPS"
      >
        <template #append>
          <q-btn-toggle
            v-model="localProfile.measures.velocityUnit"
            no-caps
            :options="[
              {label: 'FPS', value: 'FPS'},
              {label: 'MPS', value: 'MPS'}
            ]"
          />
        </template>
      </q-input>
      <div v-if="localProfile.options.enablePowderSensitivity">
        <q-input
          v-model="localProfile.measures.temperature"
          label="Measured temperature"
          filled
          step="any"
          type="number"
          lazy-rules
          :rules="[ val => val && val > 0 || 'Temperature must be positive']"
          class="q-mt-md"
          hint="e.g 59 °F / 15 °C"
        >
          <template #append>
            <q-btn-toggle
              v-model="localProfile.measures.temperatureUnit"
              no-caps
              :options="[
                {label: '°F', value: '°F'},
                {label: '°C', value: '°C'}
              ]"
            />
          </template>
        </q-input>
        <q-input
          v-model="localProfile.measures.temperatureModifier"
          label="Temperature modifier"
          filled
          step="any"
          type="number"
          suffix="FPS / °F"
          lazy-rules
          :rules="[ val => val && val >= 0 || 'Temperature modifier must be positive or equal to 0']"
          class="q-mt-md"
          hint="e.g 1.00"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
// imports
import * as BC from 'js-ballistics'
import { ref, watch } from 'vue'

// props
const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

// event emit
const emits = defineEmits(['update:profile'])// props
const localProfile = ref(props.profile)

watch(localProfile, (newValue) => {
  emits('update:profile', newValue)
})

/*
 * Unit conversion
 */

// conversion for measured velocity
watch(() => localProfile.value.measures.velocityUnit, (newValue) => {
  if (newValue === 'FPS') {
    localProfile.value.measures.velocity = BC.UNew.MPS(localProfile.value.measures.velocity).In(BC.Unit.FPS)
    localProfile.value.measures.velocity = Math.round(localProfile.value.measures.velocity * 10) / 10
  }
  if (newValue === 'MPS') {
    localProfile.value.measures.velocity = BC.UNew.FPS(localProfile.value.measures.velocity).In(BC.Unit.MPS)
    localProfile.value.measures.velocity = Math.round(localProfile.value.measures.velocity * 10) / 10
  }
})
// conversion for temperature
watch(() => localProfile.value.measures.temperatureUnit, (newValue) => {
  if (newValue === '°F') {
    localProfile.value.measures.temperature = BC.UNew.Celsius(localProfile.value.measures.temperature).In(BC.Unit.Fahrenheit)
    localProfile.value.measures.temperature = Math.round(localProfile.value.measures.temperature * 10) / 10
  }
  if (newValue === '°C') {
    localProfile.value.measures.temperature = BC.UNew.Fahrenheit(localProfile.value.measures.temperature).In(BC.Unit.Celsius)
    localProfile.value.measures.temperature = Math.round(localProfile.value.measures.temperature * 10) / 10
  }
})
</script>
