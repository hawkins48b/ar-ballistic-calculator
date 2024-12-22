<template>
  <zroCard>
    <ProfileSelector v-model="profileId" />
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
import ProfileSelector from 'components/profiles/selector/ProfileSelector.vue'
import { useMpbrStore } from 'stores/mpbr'
import { storeToRefs } from 'pinia'

// set calculation profile
const mpbrStore = useMpbrStore()
const { profileId } = storeToRefs(mpbrStore)
</script>
