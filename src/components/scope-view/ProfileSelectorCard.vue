<template>
  <q-card>
    <ProfileSelector
      v-model="profileId"
    />
  </q-card>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useScopeViewStore } from 'src/stores/scopeview'
import ProfileSelector from '../profiles/selector/ProfileSelector.vue'

const scopeViewStore = useScopeViewStore()
const { profileId } = storeToRefs(scopeViewStore)

</script>
