<template>
  <q-card>
    <ProfileSelector v-model="profileId" />
  </q-card>
</template>

<script setup>
// imports
import ProfileSelector from 'components/profiles/selector/ProfileSelector.vue'
import { useMpbrStore } from 'stores/mpbr'
import { storeToRefs } from 'pinia'

// set calculation profile
const mpbrStore = useMpbrStore()
const { profileId } = storeToRefs(mpbrStore)
</script>
