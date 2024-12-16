<template>
  <q-card
    flat
    :class="{'bg-grey-3':!$q.dark.isActive}"
    class="q-pa-md"
  >
    <div class="text-h6">
      <q-icon
        name="tune"
        size="lg"
        class="q-mr-sm"
      />
      Range
    </div>
    <q-form>
      <q-input
        v-model="settings.range.distance"
        label="Range"
        filled
        step="any"
        type="number"
        lazy-rules
        :rules="[
          val => val && val > 0 || 'The range must be positive'
        ]"
        class="q-mt-md"
        hint="Recommended value is at least 100 YD / M"
        debounce="500"
      >
        <template #append>
          <q-btn-toggle
            v-model="settings.range.unit"
            no-caps
            :options="[
              {label: 'YD', value: 'YD'},
              {label: 'M', value: 'M'}
            ]"
          />
        </template>
      </q-input>
      <q-input
        v-model="settings.zero.distance"
        label="Zero"
        filled
        step="any"
        type="number"
        lazy-rules
        :rules="[
          val => val && val > 0 || 'The zero distance must be positive'
        ]"
        class="q-mt-md"
        hint="The distance you zeroed your rifle"
        debounce="500"
      >
        <template #append>
          <q-btn-toggle
            v-model="settings.zero.unit"
            no-caps
            :options="[
              {label: 'YD', value: 'YD'},
              {label: 'M', value: 'M'}
            ]"
          />
        </template>
      </q-input>
    </q-form>
  </q-card>
</template>

<script setup>
// imports
import { useTrajectoryValidationStore } from 'stores/trajectoryValidation'
import { storeToRefs } from 'pinia'
import * as BC from 'js-ballistics'
import { watch } from 'vue'

// set calculation profile
const trajectoryValidationStore = useTrajectoryValidationStore()
const { settings } = storeToRefs(trajectoryValidationStore)

/*
 * Unit conversion
 */
// conversion range
watch(() => settings.value.range.unit, (newValue) => {
  if (newValue === 'YD') {
    settings.value.range.distance = BC.UNew.Meter(parseFloat(settings.value.range.distance)).In(BC.Unit.Yard)
    settings.value.range.distance = Math.round(settings.value.range.distance * 10) / 10
  }
  if (newValue === 'M') {
    settings.value.range.distance = BC.UNew.Yard(parseFloat(settings.value.range.distance)).In(BC.Unit.Meter)
    settings.value.range.distance = Math.round(settings.value.range.distance * 10) / 10
  }
})
// conversion zero
watch(() => settings.value.zero.unit, (newValue) => {
  if (newValue === 'YD') {
    settings.value.zero.distance = BC.UNew.Meter(parseFloat(settings.value.zero.distance)).In(BC.Unit.Yard)
    settings.value.zero.distance = Math.round(settings.value.zero.distance * 10) / 10
  }
  if (newValue === 'M') {
    settings.value.zero.distance = BC.UNew.Yard(parseFloat(settings.value.zero.distance)).In(BC.Unit.Meter)
    settings.value.zero.distance = Math.round(settings.value.zero.distance * 10) / 10
  }
})
</script>
