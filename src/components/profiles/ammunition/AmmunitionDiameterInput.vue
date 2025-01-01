<template>
  <q-input
    v-model.number="diameter"
    label="Bullet diameter"
    filled
    step="any"
    type="number"
    lazy-rules
    :rules="[
      val => val && val > 0 || 'Bullet diameter must be positive',
      val => val && val < 13 || val + ' ' + unit +' is a big bullet, are you missing a comma ?'
    ]"
    hint="e.g .223 inch or 5.56 mm"
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
const diameter = defineModel('diameter', {
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
    const distance = BC.UNew.Millimeter(diameter.value)
    const inch = distance.In(BC.Unit.Inch)
    diameter.value = Math.round(inch * 1000) / 1000
  }
  if (newUnit === 'MM') {
    const distance = BC.UNew.Inch(diameter.value)
    const milimeter = distance.In(BC.Unit.Millimeter)
    diameter.value = Math.round(milimeter * 1000) / 1000
  }
})
</script>
