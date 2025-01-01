<template>
  <q-input
    v-model.number="weight"
    label="Bullet weight"
    filled
    step="any"
    type="number"
    lazy-rules
    :rules="[ val => val && val > 0 || 'Bullet weight must be positive']"
    hint="e.g 55 GR"
  >
    <template #append>
      <q-btn-toggle
        v-model="unit"
        no-caps
        :options="[
          {label: 'GR', value: 'GR'},
          {label: 'G', value: 'G'}
        ]"
      />
    </template>
  </q-input>
</template>

<script setup>
import * as BC from 'js-ballistics'
import { watch } from 'vue'
const weight = defineModel('weight', {
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
  if (newUnit === 'GR') {
    const mass = BC.UNew.Gram(weight.value)
    const grain = mass.In(BC.Unit.Grain)
    weight.value = Math.round(grain * 100) / 100
  }
  if (newUnit === 'G') {
    const mass = BC.UNew.Grain(weight.value)
    const gram = mass.In(BC.Unit.Gram)
    weight.value = Math.round(gram * 1000) / 1000
  }
})
</script>
