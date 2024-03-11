<template>
  <q-toggle
    v-model="darkMode"
  />
</template>

<script>
import { LocalStorage } from 'quasar'

export default {
  name: 'DarkModeToggle',
  setup () {
    return {}
  },
  data: function () {
    return {
      darkMode: JSON.parse(LocalStorage.getItem('settings.darkMode')) || false
    }
  },
  watch: {
    darkMode (newValue) {
      // set darkMode
      this.$q.dark.set(newValue)

      // store value
      LocalStorage.set('settings.darkMode', JSON.stringify(this.$q.dark.isActive))
    }
  }
}
</script>
