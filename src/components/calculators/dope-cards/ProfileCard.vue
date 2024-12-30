<template>
  <q-card>
    <ProfileSelector v-model="profileId" />
  </q-card>
</template>

<script setup>
// imports
import ProfileSelector from 'components/profiles/selector/ProfileSelector.vue'
import { useDopeCardsStore } from 'stores/dopecards'
import { storeToRefs } from 'pinia'

// set calculation profile
const dopeCardsStore = useDopeCardsStore()
const { profileId } = storeToRefs(dopeCardsStore)
</script>
