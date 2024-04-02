<template>
  <q-btn
    v-if="props.shot"
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
import { useMpbrStore } from 'stores/mpbr'
import { ref } from 'vue'
import * as BC from 'js-ballistics'

// props
const props = defineProps({
  shot: {
    type: Object,
    required: false,
    default: null
  },
  distanceUnit: {
    type: String,
    required: true
  }
})

// router
const router = useRouter()

/*
 *  Button click event
 */
const ballisticStore = useBallisticStore()
const mpbrStore = useMpbrStore()
const nearZero = ref(0)
const range = ref(0)

const useMbpr = () => {
  // set nearZero and range
  if (props.shot) {
    let unit
    if (props.distanceUnit === 'YD') {
      unit = BC.Unit.Yard
    }
    if (props.distanceUnit === 'M') {
      unit = BC.Unit.Meter
    }
    nearZero.value = Math.round(props.shot.weapon.zeroDistance.In(unit))
    range.value = props.shot.distanceMax - props.shot.distanceMax % 100 + 100

    // update ballistic calculator values
    ballisticStore.profileId = mpbrStore.profileId
    ballisticStore.zero.distance = nearZero
    ballisticStore.zero.unit = props.distanceUnit
    ballisticStore.range.distance = range
    ballisticStore.range.unit = props.distanceUnit

    router.push('/calculator/ballistic')
  }
}
</script>
