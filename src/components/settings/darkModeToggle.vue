<!-- eslint-disable vue/v-slot-style -->
<template>
  <q-btn-toggle
    v-model="darkMode"
    :options="[
      {slot: 'light', value: false},
      {slot: 'dark', value: true},
    ]"

    rounded
    toggle-color="primary"
    color="white"
    text-color="grey"
  >
    <template v-slot:light>
      <q-icon name="light_mode" />
    </template>

    <template v-slot:dark>
      <q-icon name="dark_mode" />
    </template>
  </q-btn-toggle>
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
