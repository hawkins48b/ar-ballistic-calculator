<template>
  <q-input
    v-model.number="twist"
    label="Barrel twist"
    filled
    step="any"
    type="number"
    lazy-rules
    prefix="1/"
    :rules="[
      val => val && val > 0 || 'Barrel twist must be positive' ]"
    hint="1/7' means the barrel spin the bullet once over every 7-inches of rifling"
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

const twist = defineModel('twist', {
  type: [String, Number]
})
const unit = defineModel('unit', {
  type: String
})

/*
 * Unit conversion
 */

// conversion for bullet diameter
watch(unit, (newUnit) => {
  if (newUnit === 'IN') {
    const distance = BC.UNew.Millimeter(twist.value)
    const inch = distance.In(BC.Unit.Inch)
    twist.value = Math.round(inch * 1000) / 1000
  }
  if (newUnit === 'MM') {
    const distance = BC.UNew.Inch(twist.value)
    const milimeter = distance.In(BC.Unit.Millimeter)
    twist.value = Math.round(milimeter * 1000) / 1000
  }
})
</script>
