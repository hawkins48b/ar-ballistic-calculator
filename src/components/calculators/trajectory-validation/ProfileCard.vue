<template>
  <zroCard>
    <ProfileSelector v-model="profileId" />
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
import ProfileSelector from 'components/profiles/selector/ProfileSelector.vue'
import { useTrajectoryValidationStore } from 'stores/trajectoryValidation'
import { storeToRefs } from 'pinia'

// set calculation profile
const trajectoryValidationStore = useTrajectoryValidationStore()
const { profileId } = storeToRefs(trajectoryValidationStore)
</script>
