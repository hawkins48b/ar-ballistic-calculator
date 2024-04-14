<template>
  <q-btn
    v-if="props.newVelocity"
    icon="add_chart"
    color="primary"
    @click="updateProfile"
  >
    &nbsp;Use calculated velocity
  </q-btn>
</template>

<script setup>
// imports
import { useTrajectoryValidationStore } from 'stores/trajectoryValidation'
import { useProfilesStore } from 'stores/profiles'
import { useQuasar } from 'quasar'

// stores
const trajectoryValidationStore = useTrajectoryValidationStore()
const profilesStore = useProfilesStore()

// quasar $q
const $q = useQuasar()

const props = defineProps({
  newVelocity: {
    type: Number,
    required: false,
    default: 0
  }
})

const updateProfile = () => {
  const profileId = trajectoryValidationStore.profileId
  const profile = profilesStore.profilebyId(profileId)
  profile.measures.velocity = props.newVelocity

  // show dialog
  $q.dialog({
    title: 'Profile updated',
    message: `The profile has been updated with the new velocity of ${props.newVelocity} ${profile.measures.velocityUnit}.`
  })

  // update velocity chart by updating a prop
  trajectoryValidationStore.velocity = props.newVelocity
}
</script>
