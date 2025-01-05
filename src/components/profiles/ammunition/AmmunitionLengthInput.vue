<template>
  <q-input
    v-model.number="length"
    label="Bullet length"
    filled
    step="any"
    type="number"
    lazy-rules
    :rules="[
      val => val && val > 0 || 'bullet length must be positive'
    ]"
    hint="The length of the bullet, e.g 0.746 for M193"
  >
    <template #append>
      <q-btn-toggle
        v-model="unit"
        no-caps
        :options="[
          {label: 'IN', value: 'IN'},
          {label: 'MM', value: 'MM'}
        ]"
      />
    </template>
  </q-input>
</template>

<script setup>
import * as BC from 'js-ballistics'
import { watch } from 'vue'

const length = defineModel('length', {
  type: [String, Number]
})
const unit = defineModel('unit', {
  type: String
})
/*
 * Unit conversion
 */

// conversion for bullet length
watch(unit, (newUnit) => {
  if (newUnit === 'IN') {
    const distance = BC.UNew.Millimeter(length.value)
    const inch = distance.In(BC.Unit.Inch)
    length.value = Math.round(inch * 1000) / 1000
  }
  if (newUnit === 'MM') {
    const distance = BC.UNew.Inch(length.value)
    const milimeter = distance.In(BC.Unit.Millimeter)
    length.value = Math.round(milimeter * 1000) / 1000
  }
})
</script>
