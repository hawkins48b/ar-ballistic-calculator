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
        v-model="settings.measures.elevation"
        label="Measured elevation"
        filled
        step="any"
        type="number"
        class="q-mt-md"
        hint="The measured elevation compared to point of aim."
        debounce="500"
      >
        <template #append>
          <q-btn-toggle
            v-model="settings.measures.unit"
            no-caps
            :options="[
              {label: 'IN', value: 'IN'},
              {label: 'CM', value: 'CM'}
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
// conversion elevation length
watch(() => settings.value.elevationLength.unit, (newValue) => {
  if (newValue === 'IN') {
    settings.value.measures.elevation = BC.UNew.Centimeter(parseFloat(settings.value.measures.elevation)).In(BC.Unit.Inch)
    settings.value.measures.elevation = Math.round(settings.value.measures.elevation * 10) / 10
  }
  if (newValue === 'CM') {
    settings.value.measures.elevation = BC.UNew.Inch(parseFloat(settings.value.measures.elevation)).In(BC.Unit.Centimeter)
    settings.value.measures.elevation = Math.round(settings.value.measures.elevation * 10) / 10
  }
})
/*
// conversion elevation angular
watch(() => settings.value.measure.unit, (newValue) => {
  if (newValue === 'MOA') {
    settings.value.measures.elevation = BC.UNew.MOA(parseFloat(settings.value.measures.elevation)).In(BC.Unit.MRad)
    settings.value.measures.elevation = Math.round(settings.value.measures.elevation * 10) / 10
  }
  if (newValue === 'MRAD') {
    settings.value.measures.elevation = BC.UNew.MRad(parseFloat(settings.value.measures.elevation)).In(BC.Unit.MOA)
    settings.value.measures.elevation = Math.round(settings.value.measures.elevation * 10) / 10
  }
})
  */

</script>
