<template>
  <q-list>
    <q-item>
      <q-item-section>
        <q-item-label overline>
          Profile Velocity
        </q-item-label>
        <q-item-label class="text-bold">
          {{ initialVelocity }} {{ velocityUnit }}
        </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label overline>
          Validated Velocity
        </q-item-label>
        <q-item-label class="text-bold">
          {{ props.newVelocity }} {{ velocityUnit }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
// imports
import { computed } from 'vue'
import { useTrajectoryValidationStore } from 'stores/trajectoryValidation'
import { useProfilesStore } from 'stores/profiles'

// props
const props = defineProps({
  newVelocity: {
    type: Number,
    required: false,
    default: 0
  }
})

const trajectoryValidationStore = useTrajectoryValidationStore()
const profilesStore = useProfilesStore()

const velocityUnit = computed(() => {
  let unit

  const profileId = trajectoryValidationStore.profileId

  if (profileId) {
    unit = profilesStore.profilebyId(profileId).measures.velocityUnit
  }

  return unit
})
const initialVelocity = computed(() => {
  let velocity

  const profileId = trajectoryValidationStore.profileId

  if (profileId) {
    velocity = profilesStore.profilebyId(profileId).measures.velocity
  }

  return velocity
})

</script>
