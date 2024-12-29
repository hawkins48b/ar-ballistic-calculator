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
import { useProfilesStore } from 'stores/profiles'
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
    type: Number,
    required: true
  }
})

// router
const router = useRouter()

/*
 *  Button click event
 */
const ballisticStore = useBallisticStore()
const profileStore = useProfilesStore()
const mpbrStore = useMpbrStore()
const nearZero = ref(0)
const range = ref(0)

const useMbpr = () => {
  // set nearZero and range
  if (props.shot) {
    nearZero.value = Math.round(props.shot.nearZero.In(props.distanceUnit))
    range.value = props.shot.mpbr.distanceMax.In(props.distanceUnit) - props.shot.mpbr.distanceMax.In(props.distanceUnit) % 100 + 100

    // update ballistic calculator values
    const profile = ref(profileStore.profilebyId(mpbrStore.profileId))
    profile.value.optic.zero = nearZero.value
    ballisticStore.profileId = mpbrStore.profileId
    ballisticStore.range.distance = range

    if (props.distanceUnit === BC.Unit.Yard) {
      profile.value.optic.zeroUnit = 'YD'
      ballisticStore.range.unit = 'YD'
    }
    if (props.distanceUnit === BC.Unit.Meter) {
      profile.value.optic.zeroUnit = 'M'
      ballisticStore.range.unit = 'M'
    }

    router.push('/calculators/ballistic')
  }
}
</script>
