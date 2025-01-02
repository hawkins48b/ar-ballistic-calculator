<template>
  <q-input
    v-model.number="click"
    label="Adjustment click value"
    filled
    step="any"
    type="number"
    lazy-rules
    :rules="[
      val => val && val > 0 || 'Click value must be positive'
    ]"
    hint="The adjustment value for a click on the optic."
  >
    <template #append>
      <q-btn-toggle
        v-model="unit"
        no-caps
        :options="[
          {label: 'MOA', value: 'MOA'},
          {label: 'MRAD', value: 'MRAD'}
        ]"
      />
    </template>
  </q-input>
</template>

<script setup>
import * as BC from 'js-ballistics'
import { watch } from 'vue'

const click = defineModel('click', {
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
  if (newUnit === 'MOA') {
    const angle = BC.UNew.MRad(click.value)
    const mrad = angle.In(BC.Unit.MOA)
    click.value = Math.round(mrad * 10) / 10
  }
  if (newUnit === 'MRAD') {
    const angle = BC.UNew.MOA(click.value)
    const moa = angle.In(BC.Unit.MRad)
    click.value = Math.round(moa * 10) / 10
  }
})
</script>
