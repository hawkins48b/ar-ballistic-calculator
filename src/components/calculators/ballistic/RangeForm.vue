<template>
  <q-form>
    <q-input
      v-model="range.distance"
      label="Range"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'Range must be positive',
        val => val <= 3000 || 'Range must be inferior or equal to 3000'
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
          @update:model-value="changeRangeUnit()"
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
import * as BC from 'js-ballistics'
import { defineModel } from 'vue'

const range = defineModel({
  type: Object,
  required: true
})

/*
 * Unit conversion
 */
// conversion range distance
const changeRangeUnit = function () {
  if (range.value.unit === 'YD') {
    range.value.distance = BC.UNew.Meter(parseFloat(range.value.distance)).In(BC.Unit.Yard)
    range.value.distance = Math.round(range.value.distance * 10) / 10
  }
  if (range.value.unit === 'M') {
    range.value.distance = BC.UNew.Yard(parseFloat(range.value.distance)).In(BC.Unit.Meter)
    range.value.distance = Math.round(range.value.distance * 10) / 10
  }
}

</script>
