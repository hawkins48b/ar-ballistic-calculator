<template>
  <router-view />
</template>

<script setup>

import { watch } from 'vue'
import { useSettingsStore } from './stores/settings'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'

// theme mode
const settingsStore = useSettingsStore()
const { isDarkMode } = storeToRefs(settingsStore)
const $q = useQuasar()
watch(isDarkMode, (newValue) => {
  $q.dark.set(newValue)
}, {
  immediate: true
})

</script>
