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
          MIN. POINT BLANK RANGE
        </q-item-label>
        <q-item-label class="text-bold">
          {{ mpbrDistanceMin }} {{ distanceLabel }}
        </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label overline>
          MAX. POINT BLANK RANGE
        </q-item-label>
        <q-item-label class="text-bold">
          {{ mpbrDistanceMax }} {{ distanceLabel }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
// imports
import { computed } from 'vue'
import { useMpbrStore } from 'stores/mpbr'

// props
const props = defineProps({
  shot: {
    type: Object,
    required: false,
    default: null
  }
})

const mpbrStore = useMpbrStore()

const nearZero = computed(() => {
  let distance = 0
  if (props.shot) {
    distance = Math.round(props.shot.nearZero.In(mpbrStore.distanceUnit))
  }
  return distance
})
const farZero = computed(() => {
  let distance = 0
  if (props.shot && props.shot.farZero) {
    distance = Math.round(props.shot.farZero.In(mpbrStore.distanceUnit))
  }

  return distance
})
const mpbrDistanceMin = computed(() => {
  let distance = 0
  if (props.shot) {
    distance = Math.round(props.shot.mpbr.distanceMin.In(mpbrStore.distanceUnit))
  }
  return distance
})
const mpbrDistanceMax = computed(() => {
  let distance = 0
  if (props.shot) {
    distance = Math.round(props.shot.mpbr.distanceMax.In(mpbrStore.distanceUnit))
  }
  return distance
})

const distanceLabel = computed(() => {
  let label
  if (mpbrStore.target.unit === 'IN') {
    label = 'yard'
  }
  if (mpbrStore.target.unit === 'CM') {
    label = 'meter'
  }
  return label
})

</script>
