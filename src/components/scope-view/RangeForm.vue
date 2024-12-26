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
  </q-form>
</template>

<script setup>
import { useScopeViewStore } from 'stores/scopeview'
import { storeToRefs } from 'pinia'
import * as BC from 'js-ballistics'

const scopeViewStore = useScopeViewStore()
const { range } = storeToRefs(scopeViewStore)

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
