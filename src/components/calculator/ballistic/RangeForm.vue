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
      debounce="500"
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
      debounce="500"
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
        val => val && val <= parseFloat(range.distance) || 'Step must be lower or equal than range'
      ]"
      class="q-mt-md"
      hint="Recommended value is 25"
      debounce="500"
    />
  </q-form>
</template>

<script setup>
// imports
import { useBallisticStore } from 'stores/ballistic'
import { storeToRefs } from 'pinia'
import * as BC from 'js-ballistics'
import { watch } from 'vue'

// set calculation profile
const ballisticStore = useBallisticStore()
const { range, zero } = storeToRefs(ballisticStore)

/*
 * Unit conversion
 */

// conversion zero distance
watch(() => zero.value.unit, (newValue) => {
  if (newValue === 'YD') {
    zero.value.distance = BC.UNew.Meter(parseFloat(zero.value.distance)).In(BC.Unit.Yard)
    zero.value.distance = Math.round(zero.value.distance * 10) / 10
  }
  if (newValue === 'M') {
    zero.value.distance = BC.UNew.Yard(parseFloat(zero.value.distance)).In(BC.Unit.Meter)
    zero.value.distance = Math.round(zero.value.distance * 10) / 10
  }
})
// conversion range distance
watch(() => range.value.unit, (newValue) => {
  if (newValue === 'YD') {
    range.value.distance = BC.UNew.Meter(parseFloat(range.value.distance)).In(BC.Unit.Yard)
    range.value.distance = Math.round(range.value.distance * 10) / 10
  }
  if (newValue === 'M') {
    range.value.distance = BC.UNew.Yard(parseFloat(range.value.distance)).In(BC.Unit.Meter)
    range.value.distance = Math.round(range.value.distance * 10) / 10
  }
})

</script>
