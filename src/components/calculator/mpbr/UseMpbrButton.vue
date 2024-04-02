<template>
  <q-btn
    icon="add_chart"
    color="primary"
    @click="useMbpr"
  >
    &nbsp;Use MBPR
  </q-btn>
</template>

<script setup>
// imports
import { useRouter } from 'vue-router'
import { useBallisticStore } from 'stores/ballistic'

// props
const props = defineProps({
  zero: {
    type: Number,
    required: true
  },
  distanceUnit: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  }
})

// router
const router = useRouter()

const ballisticStore = useBallisticStore()

const useMbpr = () => {
  ballisticStore.zero.distance = props.zero
  ballisticStore.zero.unit = props.distanceUnit
  ballisticStore.range.distance = props.distance
  ballisticStore.range.unit = props.distanceUnit

  console.log(router)
}
</script>
