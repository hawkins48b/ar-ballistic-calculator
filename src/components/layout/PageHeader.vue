<template>
  <div>
    <DesktopHeader v-if="$q.platform.is.desktop">
      <slot />
    </DesktopHeader>
    <MobileHeader v-if="$q.platform.is.mobile">
      <slot />
    </MobileHeader>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import MobileHeader from './MobileHeader.vue'
import DesktopHeader from './DesktopHeader.vue'

const $q = useQuasar()
</script>
