<template>
  <div class="row items-center q-gutter-sm">
    <div class="col">
      <q-input
        v-model.number="elevationClick"
        label="Elevation"
        filled
        step="any"
        type="number"
        lazy-rules
        :rules="[
          val => val && val > 0 || 'Click value must be positive'
        ]"
        hint="Value for a click on the elevation turret."
        @update:model-value="linkWindage"
      >
        <template #append>
          <q-btn-toggle
            v-model="elevationUnit"
            no-caps
            :options="[
              {label: 'MOA', value: 'MOA'},
              {label: 'MRAD', value: 'MRAD'}
            ]"
            @update:model-value="linkWindage"
          />
        </template>
      </q-input>
      <q-input
        v-model.number="windageClick"
        class="q-mt-md"
        label="Windage"
        filled
        step="any"
        type="number"
        lazy-rules
        :rules="[
          val => val && val > 0 || 'Click value must be positive'
        ]"
        hint="Value for a click on the windage turret."
        :disable="areValuesLinked"
      >
        <template #append>
          <q-btn-toggle
            v-model="windageUnit"
            no-caps
            :options="[
              {label: 'MOA', value: 'MOA'},
              {label: 'MRAD', value: 'MRAD'}
            ]"
            :disable="areValuesLinked"
          />
        </template>
      </q-input>
    </div>
    <div class="col-auto">
      <q-btn
        :icon="areValuesLinked ? 'link' : 'link_off'"
        round
        flat
        @click="linkValuesClick"
      />
    </div>
  </div>
</template>

<script setup>
import * as BC from 'js-ballistics'
import { watch, ref, nextTick, onMounted } from 'vue'

const areValuesLinked = ref(false)

const elevationClick = defineModel('elevation-click', {
  type: [String, Number]
})
const elevationUnit = defineModel('elevation-unit', {
  type: String
})
const windageClick = defineModel('windage-click', {
  type: [String, Number]
})
const windageUnit = defineModel('windage-unit', {
  type: String
})

// initialize areValuesLinked
onMounted(() => {
  if (elevationClick.value === windageClick.value && elevationUnit.value === windageUnit.value) {
    areValuesLinked.value = true
  }
})

const linkWindage = function () {
  if (areValuesLinked.value) {
    windageClick.value = elevationClick.value
    windageUnit.value = elevationUnit.value
    nextTick(() => { // prevent unit conversion
      windageClick.value = elevationClick.value
      windageUnit.value = elevationUnit.value
    })
  }
}

const linkValuesClick = function () {
  areValuesLinked.value = !areValuesLinked.value
  linkWindage()
}

/*
* Unit conversion
*/

// conversion for elevation click
watch(elevationUnit, (newUnit) => {
  if (newUnit === 'MOA') {
    const angle = BC.UNew.MRad(elevationClick.value)
    const mrad = angle.In(BC.Unit.MOA)
    elevationClick.value = Math.round(mrad * 1000) / 1000
  }
  if (newUnit === 'MRAD') {
    const angle = BC.UNew.MOA(elevationClick.value)
    const moa = angle.In(BC.Unit.MRad)
    elevationClick.value = Math.round(moa * 1000) / 1000
  }
})
// conversion for windage click
watch(windageUnit, (newUnit) => {
  if (!areValuesLinked.value) {
    if (newUnit === 'MOA') {
      const angle = BC.UNew.MRad(windageClick.value)
      const mrad = angle.In(BC.Unit.MOA)
      windageClick.value = Math.round(mrad * 1000) / 1000
    }
    if (newUnit === 'MRAD') {
      const angle = BC.UNew.MOA(windageClick.value)
      const moa = angle.In(BC.Unit.MRad)
      windageClick.value = Math.round(moa * 1000) / 1000
    }
  }
})
</script>
