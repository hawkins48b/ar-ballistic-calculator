<template>
  <zroCard>
    <q-card-section>
      <div class="text-h6">
        <q-icon
          name="tune"
          size="lg"
          class="q-mr-sm"
        />
        Range
      </div>
    </q-card-section>
    <q-separator />
    <q-card-separator>
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
      </q-form>
    </q-card-separator>
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
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
</script>
