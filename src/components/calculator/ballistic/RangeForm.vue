<template>
  <q-form>
    <q-input
      v-model="zero.distance"
      label="Rifle zero distance"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'The distance must be positive'
      ]"
      class="q-mt-md"
      hint="e.g 25 YD or 25 M"
    >
      <template #append>
        <q-btn-toggle
          v-model="zero.unit"
          no-caps
          :options="[
            {label: 'YD', value: 'YD'},
            {label: 'M', value: 'M'}
          ]"
        />
      </template>
    </q-input>

    <q-input
      v-model="range.distance"
      label="Range"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'Range must be positive'
      ]"
      class="q-mt-md"
      hint="e.g 500 YD or 500 M"
    >
      <template #append>
        <q-btn-toggle
          v-model="range.unit"
          no-caps
          :options="[
            {label: 'YD', value: 'YD'},
            {label: 'M', value: 'M'}
          ]"
        />
      </template>
    </q-input>

    <q-input
      v-model="range.step"
      label="Step"
      filled
      type="number"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'Step must be positive',
        val => val && val < parseFloat(range.distance) || 'Step must be lower than range'
      ]"
      class="q-mt-md"
      hint="Recommended value is 25"
    />
  </q-form>
</template>

<script setup>
// imports
import { useCalculatorStore } from 'stores/calculator'
import { storeToRefs } from 'pinia'

// set calculation profile
const calculatorStore = useCalculatorStore()
const { range, zero } = storeToRefs(calculatorStore)

</script>
