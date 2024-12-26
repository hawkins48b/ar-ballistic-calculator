<template>
  <q-form>
    <q-input
      v-model="elevation.angle"
      label="Elevation angle"
      filled
      step="any"
      type="number"
      class="q-mt-md"
      hint="e.g 0° or 0.98 COS"
      debounce="500"
    >
      <template #append>
        <q-btn-toggle
          v-model="elevation.unit"
          no-caps
          :options="[
            {label: 'DEG', value: 'DEG'},
            {label: 'COS', value: 'COS'}
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

const scopeViewStore = useScopeViewStore()
const { elevation } = storeToRefs(scopeViewStore)

/*
 * Unit conversion
 */
// conversion range distance
const changeRangeUnit = function () {
  if (elevation.value.unit === 'DEG') {
    elevation.value.angle = Math.acos(elevation.value.angle) / Math.PI * 180
    elevation.value.angle = Math.round(elevation.value.angle)
  }
  if (elevation.value.unit === 'COS') {
    elevation.value.angle = Math.cos(elevation.value.angle * Math.PI / 180)
    elevation.value.angle = Math.round(elevation.value.angle * 1000) / 1000
  }
}

</script>
