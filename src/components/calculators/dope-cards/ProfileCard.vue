<template>
  <zroCard>
    <ProfileSelector v-model="profileId" />
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
import ProfileSelector from 'components/profiles/selector/ProfileSelector.vue'
import { useDopeCardsStore } from 'stores/dopecards'
import { storeToRefs } from 'pinia'

// set calculation profile
const dopeCardsStore = useDopeCardsStore()
const { profileId } = storeToRefs(dopeCardsStore)
</script>
