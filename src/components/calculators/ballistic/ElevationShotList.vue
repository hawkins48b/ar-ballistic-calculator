<template>
  <q-list>
    <q-item>
      <q-item-section>
        <q-item-label overline>
          NEAR ZERO
        </q-item-label>
        <q-item-label class="text-bold">
          {{ nearZero }} {{ distanceLabel }}
        </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label overline>
          FAR ZERO
        </q-item-label>
        <q-item-label class="text-bold">
          {{ farZero }} {{ distanceLabel }}
        </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label overline>
          MAX. ORDINANCE
        </q-item-label>
        <q-item-label class="text-bold">
          {{ maxOrdinanceElevation }} {{ elevationLabel }} at {{ maxOrdinanceDistance }} {{ distanceLabel }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
// imports
import { computed } from 'vue'
import { useBallisticStore } from 'stores/calculators/ballistic'
import * as BC from 'js-ballistics'

// props
const props = defineProps({
  shot: {
    type: Object,
    required: false,
    default: null
  }
})

const ballisticStore = useBallisticStore()

const nearZero = computed(() => {
  let distance = 0
  if (props.shot && props.shot.nearZero) {
    distance = Math.round(props.shot.nearZero.In(ballisticStore.distanceUnit))
  }
  return distance
})
const farZero = computed(() => {
  let distance = 'unkown'
  if (props.shot && props.shot.farZero) {
    distance = Math.round(props.shot.farZero.In(ballisticStore.distanceUnit))
  }
  return distance
})
const maxOrdinanceDistance = computed(() => {
  let distance = 0
  if (props.shot) {
    distance = Math.round(props.shot.maxOrdinance.distance.In(ballisticStore.distanceUnit))
  }
  return distance
})
const maxOrdinanceElevation = computed(() => {
  let elevation = 0
  if (props.shot) {
    elevation = Math.round(props.shot.maxOrdinance.elevation.In(ballisticStore.elevationUnit) * 10) / 10
  }
  return elevation
})

const distanceLabel = computed(() => {
  let label
  if (ballisticStore.distanceUnit === BC.Unit.Yard) {
    label = 'yard'
  }
  if (ballisticStore.distanceUnit === BC.Unit.Meter) {
    label = 'meter'
  }
  return label
})
const elevationLabel = computed(() => {
  let label
  if (ballisticStore.elevationUnit === BC.Unit.Inch) {
    label = 'inch'
  }
  if (ballisticStore.elevationUnit === BC.Unit.Centimeter) {
    label = 'cm'
  }
  return label
})

</script>
