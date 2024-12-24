<template>
  <zroCard>
    <ProfileSelector v-model="profileId" />
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
import ProfileSelector from 'components/profiles/selector/ProfileSelector.vue'
import { useBallisticStore } from 'stores/ballistic'
import { storeToRefs } from 'pinia'

// set calculation profile
const ballisticStore = useBallisticStore()
const { profileId } = storeToRefs(ballisticStore)
</script>
