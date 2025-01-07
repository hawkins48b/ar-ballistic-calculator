<template>
  <div :class="{limitWidth:$q.platform.is.desktop}">
    <router-view />
  </div>
</template>

<script setup>
// imports
import { watch } from 'vue'
import { useSettingsStore } from 'stores/settings'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'

// theme mode
const settingsStore = useSettingsStore()
const { general } = storeToRefs(settingsStore)
const $q = useQuasar()

watch(() => general.value.darkMode, (newValue) => {
  $q.dark.set(newValue)
}, {
  immediate: true
})

</script>

<style lang="scss">
.limitWidth {
  max-width: 800px;
}

</style>
