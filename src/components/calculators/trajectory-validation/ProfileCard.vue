<template>
  <q-card>
    <ProfileSelector v-model="profileId" />
  </q-card>
</template>

<script setup>
// imports
import ProfileSelector from 'components/profiles/selector/ProfileSelector.vue'
import { useTrajectoryValidationStore } from 'stores/trajectoryValidation'
import { storeToRefs } from 'pinia'

// set calculation profile
const trajectoryValidationStore = useTrajectoryValidationStore()
const { profileId } = storeToRefs(trajectoryValidationStore)
</script>
