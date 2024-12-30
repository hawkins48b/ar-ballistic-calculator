<!-- eslint-disable vue/v-slot-style -->
<template>
  <div>
    <div>Dark mode</div>
    <q-radio
      v-model="general.darkMode"
      val="auto"
      label="Auto"
    />
    <q-radio
      v-model="general.darkMode"
      :val="false"
      label="Light"
    />
    <q-radio
      v-model="general.darkMode"
      :val="true"
      label="Dark"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useSettingsStore } from 'stores/settings'

const settingsStore = useSettingsStore()
const { general } = storeToRefs(settingsStore)

</script>
