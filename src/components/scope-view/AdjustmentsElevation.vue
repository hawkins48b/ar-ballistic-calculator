<template>
  <div class="row items-center q-gutter-md">
    <div class="col-auto">
      <div>
        <q-icon
          :name="direction === 'UP' || direction === '' ? 'arrow_upward' : 'arrow_downward'"
          size="xl"
        />
      </div>
      <div class="text-center">
        {{ direction }}
      </div>
    </div>
    <div class="col text-h4">
      {{ Math.abs(scopeViewStore.getElevation) }} {{ adjustments.elevation }}
    </div>
  </div>
</template>

<script setup>

import { useScopeViewStore } from 'stores/scopeview'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const scopeViewStore = useScopeViewStore()
const { adjustments } = storeToRefs(scopeViewStore)

const direction = computed(() => {
  let dir = ''
  if (scopeViewStore.getElevation > 0) {
    dir = 'DOWN'
  }
  if (scopeViewStore.getElevation < 0) {
    dir = 'UP'
  }
  return dir
})

</script>
