<template>
  <q-input
    v-model.number="height"
    label="Optic height"
    filled
    step="any"
    type="number"
    lazy-rules
    :rules="[
      val => val && val > 0 || 'Optic height must be positive'
    ]"
    hint="Height over bore"
  >
    <template #append>
      <q-btn-toggle
        v-model="unit"
        no-caps
        :options="[
          {label: 'IN', value: 'IN'},
          {label: 'CM', value: 'CM'}
        ]"
      />
    </template>
  </q-input>
</template>

<script setup>
import * as BC from 'js-ballistics'
import { watch } from 'vue'

const height = defineModel('height', {
  type: [String, Number]
})
const unit = defineModel('unit', {
  type: String
})

/*
 * Unit conversion
 */

// conversion for optic height
watch(unit, (newUnit) => {
  if (newUnit === 'IN') {
    const distance = BC.UNew.Centimeter(height.value)
    const inch = distance.In(BC.Unit.Inch)
    height.value = Math.round(inch * 1000) / 1000
  }
  if (newUnit === 'CM') {
    const distance = BC.UNew.Inch(height.value)
    const centimeter = distance.In(BC.Unit.Centimeter)
    height.value = Math.round(centimeter * 1000) / 1000
  }
})</script>
