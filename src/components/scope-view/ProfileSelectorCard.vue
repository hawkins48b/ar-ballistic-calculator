<template>
  <ZroCard>
    <ProfileSelector
      v-model="profileId"
    />
  </ZroCard>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import ZroCard from '../zroCard.vue'
import { useScopeViewStore } from 'src/stores/scopeview'
import ProfileSelector from '../profiles/selector/ProfileSelector.vue'

const scopeViewStore = useScopeViewStore()
const { profileId } = storeToRefs(scopeViewStore)

</script>
