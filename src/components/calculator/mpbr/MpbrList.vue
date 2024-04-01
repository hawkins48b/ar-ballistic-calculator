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
          POINT BLANK RANGE
        </q-item-label>
        <q-item-label class="text-bold">
          {{ mpbrDistance }} {{ distanceLabel }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
// imports
import { computed } from 'vue'
import { useMpbrStore } from 'stores/mpbr'
import * as BC from 'js-ballistics'

// props
const props = defineProps({
  shot: {
    type: Object,
    required: false,
    default: null
  }
})

const mpbrStore = useMpbrStore()
const distanceUnit = computed(() => mpbrStore.distanceUnit)

const nearZero = computed(() => {
  let distance = 0
  if (props.shot) {
    if (distanceUnit.value === 'YD') {
      distance = Math.round(props.shot.weapon.zeroDistance.In(BC.Unit.Yard))
    }
    if (distanceUnit.value === 'M') {
      distance = Math.round(props.shot.weapon.zeroDistance.In(BC.Unit.Meter))
    }
  }
  return distance
})
const farZero = computed(() => {
  let distance = 0
  if (props.shot) {
    distance = Math.round(props.shot.farZero)
  }
  return distance
})
const mpbrDistance = computed(() => {
  let distance = 0
  if (props.shot) {
    distance = Math.round(props.shot.distanceMax)
  }
  return distance
})

const distanceLabel = computed(() => {
  let label
  if (distanceUnit.value === 'YD') {
    label = 'yard'
  }
  if (distanceUnit.value === 'M') {
    label = 'meter'
  }
  return label
})

</script>
