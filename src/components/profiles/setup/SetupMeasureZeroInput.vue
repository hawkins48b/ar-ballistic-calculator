<template>
  <q-input
    v-model.number="distance"
    label="Zero distance"
    filled
    step="any"
    type="number"
    lazy-rules
    :rules="[
      val => val && val > 0 || 'Zero distance must be positive'
    ]"
    :hint="`Usually between 25 ${unit} and 100 ${unit}`"
  >
    <template #append>
      <q-btn-toggle
        v-model="unit"
        no-caps
        :options="[
          {label: 'YD', value: 'YD'},
          {label: 'M', value: 'M'}
        ]"
      />
    </template>
  </q-input>
</template>

<script setup>
import * as BC from 'js-ballistics'
import { watch } from 'vue'

const distance = defineModel('distance', {
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
  if (newUnit === 'YD') {
    const dist = BC.UNew.Meter(distance.value)
    const yard = dist.In(BC.Unit.Yard)
    distance.value = Math.round(yard * 1000) / 1000
  }
  if (newUnit === 'M') {
    const dist = BC.UNew.Yard(distance.value)
    const meter = dist.In(BC.Unit.Meter)
    distance.value = Math.round(meter * 1000) / 1000
  }
})</script>
