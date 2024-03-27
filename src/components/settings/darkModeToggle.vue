<template>
  <q-toggle
    v-model="darkMode"
  />
</template>

<script setup>
import { useSettingsStore } from 'stores/settings'
import { ref, watch } from 'vue'

const settingsStore = useSettingsStore()
const darkMode = ref(settingsStore.isDarkMode)

watch(darkMode, (newValue) => {
  settingsStore.setDarkTheme(newValue)
})

</script>
