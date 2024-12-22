<template>
  <zroCard>
    <div class="text-h6">
      <q-icon
        name="square_foot"
        size="lg"
        class="q-mr-sm"
      />
      Measure
    </div>
    <q-form>
      <q-btn-toggle
        v-model="settings.measures.type"
        :options="[
          {label: 'Angle', value:'angle'},
          {label: 'distance', value:'distance'}
        ]"

        class="q-mt-md"
      />
      <q-input
        v-if="settings.measures.type === 'angle'"
        v-model="settings.measures.angle"
        label="Measured angle"
        filled
        step="any"
        type="number"
        class="q-mt-md"
        hint="The measured distance compared to point of aim."
        debounce="500"
      >
        <template #append>
          <q-btn
            round
            class="q-mr-sm mobile-only"
            @click="settings.measures.angle *= -1"
          >
            neg
          </q-btn>
          <q-btn-toggle
            v-model="settings.measures.angleUnit"
            no-caps
            :options="[
              {label: 'MOA', value: 'MOA'},
              {label: 'MRAD', value: 'MRAD'}
            ]"
          />
        </template>
      </q-input>
      <q-input
        v-if="settings.measures.type === 'distance'"
        v-model="settings.measures.distance"
        label="Measured distance"
        filled
        step="any"
        type="number"
        class="q-mt-md"
        hint="The measured distance compared to point of aim."
        debounce="500"
      >
        <template #append>
          <q-btn
            round
            class="q-mr-sm mobile-only"
            @click="settings.distance.angle *= -1"
          >
            neg
          </q-btn>
          <q-btn-toggle
            v-model="settings.measures.distanceUnit"
            no-caps
            :options="[
              {label: 'IN', value: 'IN'},
              {label: 'CM', value: 'CM'}
            ]"
          />
        </template>
      </q-input>
    </q-form>
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
// conversion elevation length
watch(() => settings.value.measures.distanceUnit, (newValue) => {
  if (newValue === 'IN') {
    settings.value.measures.distance = BC.UNew.Centimeter(parseFloat(settings.value.measures.distance)).In(BC.Unit.Inch)
    settings.value.measures.distance = Math.round(settings.value.measures.distance * 10) / 10
  }
  if (newValue === 'CM') {
    settings.value.measures.distance = BC.UNew.Inch(parseFloat(settings.value.measures.distance)).In(BC.Unit.Centimeter)
    settings.value.measures.distance = Math.round(settings.value.measures.distance * 10) / 10
  }
})

// conversion elevation angular
watch(() => settings.value.measures.angleUnit, (newValue) => {
  if (newValue === 'MOA') {
    settings.value.measures.angle = BC.UNew.MRad(parseFloat(settings.value.measures.angle)).In(BC.Unit.MOA)
    settings.value.measures.angle = Math.round(settings.value.measures.angle * 10) / 10
  }
  if (newValue === 'MRAD') {
    settings.value.measures.angle = BC.UNew.MOA(parseFloat(settings.value.measures.angle)).In(BC.Unit.MRad)
    settings.value.measures.angle = Math.round(settings.value.measures.angle * 10) / 10
  }
})

</script>
